package com.careerverse.repository;

import com.careerverse.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
  boolean existsByUserId(Long userId);
  java.util.Optional<StudentProfile> findByUserId(Long userId);
}
