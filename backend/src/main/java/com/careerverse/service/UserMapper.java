package com.careerverse.service;

import com.careerverse.dto.AuthDtos.AuthUser;
import com.careerverse.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
  public AuthUser toAuthUser(User user) {
    return new AuthUser(
      user.getId(),
      user.getFullName(),
      user.getEmail(),
      user.getRole() == User.Role.TRAINER ? "mentor" : user.getRole().name().toLowerCase(),
      user.getProfileImage() == null ? "" : user.getProfileImage(),
      user.getProvider().name(),
      Boolean.TRUE.equals(user.getProfileCompleted()),
      Boolean.TRUE.equals(user.getDemoAccount())
    );
  }
}
