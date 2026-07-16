package com.careerverse.controller;

import com.careerverse.dto.ProfileDtos.StudentProfileRequest;
import com.careerverse.model.StudentProfile;
import com.careerverse.model.RoleProfile;
import com.careerverse.repository.StudentProfileRepository;
import com.careerverse.repository.RoleProfileRepository;
import com.careerverse.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
  private final UserRepository users;
  private final StudentProfileRepository profiles;
  private final RoleProfileRepository roleProfiles;
  private final ObjectMapper objectMapper;

  public ProfileController(UserRepository users, StudentProfileRepository profiles, RoleProfileRepository roleProfiles, ObjectMapper objectMapper) {
    this.users = users;
    this.profiles = profiles;
    this.roleProfiles = roleProfiles;
    this.objectMapper = objectMapper;
  }

  @GetMapping("/role")
  public ResponseEntity<?> getRoleProfile(Authentication auth) {
    var user = users.findByEmailIgnoreCase(auth.getName()).orElseThrow();
    return roleProfiles.findByUserId(user.getId())
      .<ResponseEntity<?>>map(profile -> ResponseEntity.ok(Map.of("profileComplete", Boolean.TRUE.equals(user.getProfileCompleted()), "role", profile.getRole(), "profileData", profile.getProfileData())))
      .orElseGet(() -> ResponseEntity.ok(Map.of("profileComplete", Boolean.TRUE.equals(user.getProfileCompleted()), "role", user.getRole())));
  }

  @PostMapping("/role")
  public ResponseEntity<?> saveRoleProfile(Authentication auth, @RequestBody Map<String, String> data) {
    var user = users.findByEmailIgnoreCase(auth.getName()).orElseThrow();
    if (user.getRole() == com.careerverse.model.User.Role.ADMIN) {
      return ResponseEntity.status(403).body(Map.of("message", "Admin profiles are managed by the platform"));
    }
    try {
      RoleProfile profile = roleProfiles.findByUserId(user.getId()).orElseGet(RoleProfile::new);
      profile.setUser(user);
      profile.setRole(user.getRole());
      profile.setProfileData(objectMapper.writeValueAsString(data));
      roleProfiles.save(profile);
      user.setProfileCompleted(true);
      users.save(user);
      return ResponseEntity.ok(Map.of("message", "Profile saved", "profileComplete", true));
    } catch (JsonProcessingException error) {
      return ResponseEntity.badRequest().body(Map.of("message", "Unable to save profile details"));
    }
  }

  @GetMapping("/student")
  public ResponseEntity<?> getStudentProfile(Authentication auth) {
    var user = users.findByEmailIgnoreCase(auth.getName()).orElseThrow();
    return profiles.findByUserId(user.getId())
      .<ResponseEntity<?>>map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.ok(Map.of("profileComplete", false)));
  }

  @PostMapping("/student")
  public ResponseEntity<?> saveStudentProfile(Authentication auth, @RequestBody StudentProfileRequest req) {
    var user = users.findByEmailIgnoreCase(auth.getName()).orElseThrow();
    StudentProfile p = profiles.findByUserId(user.getId()).orElseGet(StudentProfile::new);
    p.setUser(user);
    p.setEducationLevel(req.educationLevel());
    p.setCurrentCourseOrClass(req.currentCourseOrClass());
    p.setStream(req.stream());
    p.setMarksOrCgpa(req.marksOrCgpa());
    p.setLocation(req.location());
    p.setCareerInterest(req.careerInterest());
    p.setSkills(req.skills());
    p.setPreferredCourse(req.preferredCourse());
    p.setPreferredCollegeType(req.preferredCollegeType());
    p.setFinancialRequirement(req.financialRequirement());
    profiles.save(p);
    user.setProfileCompleted(true);
    users.save(user);
    try {
      RoleProfile roleProfile = roleProfiles.findByUserId(user.getId()).orElseGet(RoleProfile::new);
      roleProfile.setUser(user);
      roleProfile.setRole(user.getRole());
      roleProfile.setProfileData(objectMapper.writeValueAsString(Map.of(
        "educationLevel", req.educationLevel(), "currentCourseOrClass", req.currentCourseOrClass(), "stream", req.stream(), "marksOrCgpa", String.valueOf(req.marksOrCgpa()),
        "location", req.location(), "careerInterest", req.careerInterest(), "skills", req.skills(),
        "preferredCourse", req.preferredCourse(), "preferredCollegeType", req.preferredCollegeType(), "financialRequirement", req.financialRequirement()
      )));
      roleProfiles.save(roleProfile);
    } catch (JsonProcessingException ignored) { }
    return ResponseEntity.ok(Map.of("message", "Student profile saved", "profileComplete", true));
  }
}
