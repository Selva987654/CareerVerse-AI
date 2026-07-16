package com.careerverse.repository;

import com.careerverse.model.RoleProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleProfileRepository extends JpaRepository<RoleProfile, Long> {
  Optional<RoleProfile> findByUserId(Long userId);
}
