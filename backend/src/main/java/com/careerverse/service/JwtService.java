package com.careerverse.service;

import com.careerverse.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
  @Value("${app.jwt-secret}")
  private String jwtSecret;

  private SecretKey key() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
  }

  public String generate(User user) {
    return Jwts.builder()
      .subject(user.getEmail())
      .claims(Map.of(
        "role", user.getRole().name(),
        "name", user.getFullName(),
        "id", user.getId(),
        "provider", user.getProvider().name()
      ))
      .issuedAt(Date.from(Instant.now()))
      .expiration(Date.from(Instant.now().plusSeconds(60L * 60 * 24 * 7)))
      .signWith(key())
      .compact();
  }

  public String extractEmail(String token) {
    return claims(token).getSubject();
  }

  public boolean isValid(String token) {
    return claims(token).getExpiration().after(new Date());
  }

  private Claims claims(String token) {
    return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
  }
}
