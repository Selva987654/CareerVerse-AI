package com.careerverse.repository;

import com.careerverse.model.ApplicationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRecordRepository extends JpaRepository<ApplicationRecord, Long> {
  List<ApplicationRecord> findByEmailIgnoreCaseOrderByCreatedAtDesc(String email);
}
