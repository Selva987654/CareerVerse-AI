package com.careerverse.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
  public record LoginRequest(@Email String email, @NotBlank String password, String role) {}
  public record RegisterRequest(@NotBlank String fullName, @Email String email, @NotBlank String password, String role) {}
  public record AuthUser(
    Long id,
    String name,
    String email,
    String role,
    String profileImage,
    String provider,
    boolean profileComplete,
    boolean demoAccount
  ) {}
  public record AuthResponse(String token, AuthUser user) {}
}
