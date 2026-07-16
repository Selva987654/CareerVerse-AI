package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "application_records")
public class ApplicationRecord {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String type;
  private String opportunityId;
  private String name;
  private String email;
  private String phone;
  @Column(columnDefinition = "TEXT")
  private String message;
  private String status = "Applied";
  private LocalDateTime interviewAt;
  private LocalDateTime createdAt = LocalDateTime.now();
}
