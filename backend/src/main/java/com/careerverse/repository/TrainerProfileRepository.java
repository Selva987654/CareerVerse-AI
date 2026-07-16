package com.careerverse.repository;

import com.careerverse.model.TrainerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerProfileRepository extends JpaRepository<TrainerProfile, Long> {
}
