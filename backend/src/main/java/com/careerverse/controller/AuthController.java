package com.careerverse.controller;

import com.careerverse.dto.AuthDtos.*;
import com.careerverse.model.User;
import com.careerverse.repository.UserRepository;
import com.careerverse.service.JwtService;
import com.careerverse.service.UserMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final JwtService jwt;
  private final UserMapper mapper;

  @Value("${app.frontend-url}")
  private String frontendUrl;

  public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt, UserMapper mapper) {
    this.users = users;
    this.encoder = encoder;
    this.jwt = jwt;
    this.mapper = mapper;
  }

  @GetMapping("/google/start")
  public RedirectView startGoogleLogin(@RequestParam(defaultValue = "student") String role, HttpServletResponse response) {
    String safeRole = switch (role == null ? "student" : role.toLowerCase()) {
      case "parent", "trainer", "mentor", "college", "recruiter" -> role.toLowerCase();
      default -> "student";
    };
    Cookie cookie = new Cookie("cv_oauth_role", safeRole);
    cookie.setHttpOnly(true);
    cookie.setSecure(false); // set true when HTTPS is enabled in production
    cookie.setPath("/");
    cookie.setMaxAge(300);
    response.addCookie(cookie);
    return new RedirectView("/oauth2/authorization/google");
  }

  @GetMapping("/demo-users")
  public List<Map<String, String>> demoUsers() {
    return List.of(
      Map.of("role", "student", "email", "student@careerverse.demo", "password", "demo123"),
      Map.of("role", "parent", "email", "parent@careerverse.demo", "password", "demo123"),
      Map.of("role", "college", "email", "college@careerverse.demo", "password", "demo123"),
      Map.of("role", "mentor", "email", "trainer@careerverse.demo", "password", "demo123"),
      Map.of("role", "recruiter", "email", "recruiter@careerverse.demo", "password", "demo123"),
      Map.of("role", "admin", "email", "admin@careerverse.demo", "password", "admin123")
    );
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
    if (req.role() != null && "admin".equalsIgnoreCase(req.role())) {
      return ResponseEntity.status(403).body(Map.of("message", "Admin accounts cannot be created through public registration"));
    }
    if (users.existsByEmailIgnoreCase(req.email())) {
      return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
    }
    User user = new User();
    user.setFullName(req.fullName());
    user.setEmail(req.email());
    user.setPassword(encoder.encode(req.password()));
    user.setRole(mapRole(req.role()));
    user.setProvider(User.Provider.LOCAL);
    users.save(user);
    return ResponseEntity.ok(new AuthResponse(jwt.generate(user), mapper.toAuthUser(user)));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
    User user = users.findByEmailIgnoreCase(req.email()).orElse(null);
    if (user == null || user.getPassword() == null || !encoder.matches(req.password(), user.getPassword())) {
      return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }
    if (req.role() != null && user.getRole() != mapRole(req.role())) {
      return ResponseEntity.status(403).body(Map.of("message", "This database account is not allowed for selected role"));
    }
    return ResponseEntity.ok(new AuthResponse(jwt.generate(user), mapper.toAuthUser(user)));
  }

  @GetMapping("/oauth2/success")
  public RedirectView googleSuccess(Authentication authentication, @RequestParam(required = false) String role, @CookieValue(value = "cv_oauth_role", required = false) String cookieRole, HttpServletResponse response) {
    String requestedRoleValue = role != null ? role : cookieRole;
    Cookie clearRole = new Cookie("cv_oauth_role", "");
    clearRole.setPath("/");
    clearRole.setMaxAge(0);
    response.addCookie(clearRole);

    OAuth2User principal = (OAuth2User) authentication.getPrincipal();
    String email = principal.getAttribute("email");
    String name = principal.getAttribute("name");
    String picture = principal.getAttribute("picture");
    String sub = principal.getAttribute("sub");

    User existing = users.findByProviderAndProviderId(User.Provider.GOOGLE, sub).orElseGet(() ->
      users.findByEmailIgnoreCase(email).orElse(null)
    );
    if (existing != null && Boolean.TRUE.equals(existing.getDemoAccount()) && existing.getProvider() == User.Provider.LOCAL) {
      return new RedirectView(frontendUrl + "/login?oauthError=demo-account-email");
    }

    User user;
    if (existing != null) {
      // Refresh only verified Google identity fields. Preserve the existing role and profile.
      if (name != null && !name.isBlank()) existing.setFullName(name);
      if (picture != null && !picture.isBlank()) existing.setProfileImage(picture);
      existing.setProvider(User.Provider.GOOGLE);
      existing.setProviderId(sub);
      user = users.save(existing);
    } else {
      User created = new User();
      created.setFullName(name == null ? email : name);
      created.setEmail(email);
      created.setProfileImage(picture);
      created.setProvider(User.Provider.GOOGLE);
      created.setProviderId(sub);
      User.Role requestedRole = mapRole(requestedRoleValue);
      created.setRole(requestedRole == User.Role.ADMIN ? User.Role.STUDENT : requestedRole);
      created.setDemoAccount(false);
      created.setProfileCompleted(false);
      user = users.save(created);
    }
    String token = jwt.generate(user);
    String userJson = URLEncoder.encode(toJsonUser(user), StandardCharsets.UTF_8);
    return new RedirectView(frontendUrl + "/auth/callback?token=" + token + "&user=" + userJson);
  }

  @GetMapping("/me")
  public ResponseEntity<?> me(Authentication authentication) {
    if (authentication == null || authentication.getName() == null) {
      return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
    }
    return users.findByEmailIgnoreCase(authentication.getName())
      .<ResponseEntity<?>>map(user -> ResponseEntity.ok(mapper.toAuthUser(user)))
      .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "User not found")));
  }

  private User.Role mapRole(String role) {
    if (role == null) return User.Role.STUDENT;
    return switch (role.toLowerCase()) {
      case "parent" -> User.Role.PARENT;
      case "trainer", "mentor" -> User.Role.TRAINER;
      case "college" -> User.Role.COLLEGE;
      case "recruiter" -> User.Role.RECRUITER;
      case "admin" -> User.Role.ADMIN;
      default -> User.Role.STUDENT;
    };
  }

  private String toJsonUser(User user) {
    return String.format("{\"id\":%s,\"name\":\"%s\",\"email\":\"%s\",\"role\":\"%s\",\"profileImage\":\"%s\",\"provider\":\"%s\",\"profileComplete\":%s,\"demoAccount\":%s}",
      user.getId(), esc(user.getFullName()), esc(user.getEmail()), frontendRole(user.getRole()), esc(user.getProfileImage()), user.getProvider().name(), Boolean.TRUE.equals(user.getProfileCompleted()), Boolean.TRUE.equals(user.getDemoAccount()));
  }
  private String frontendRole(User.Role role) { return role == User.Role.TRAINER ? "mentor" : role.name().toLowerCase(); }
  private String esc(String s) { return s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\""); }
}
