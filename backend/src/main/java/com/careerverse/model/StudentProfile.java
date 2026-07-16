package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "student_profiles")
public class StudentProfile {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  private String educationLevel;
  private String currentCourseOrClass;
  private String stream;
  private Double marksOrCgpa;
  private String location;
  private String careerInterest;
  @Column(columnDefinition = "TEXT")
  private String skills;
  private String preferredCourse;
  private String preferredCollegeType;
  private String financialRequirement;
}
