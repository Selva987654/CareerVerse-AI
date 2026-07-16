package com.careerverse.repository;

import com.careerverse.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CareerRepository extends JpaRepository<Career, Long> {
  Optional<Career> findBySlug(String slug);
}
