package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "courses")
public class Course {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String stream;
  private String duration;
  private String eligibility;
  private String feesRange;
  @Column(columnDefinition = "TEXT")
  private String bestForCareers;
  @Column(columnDefinition = "TEXT")
  private String skillsLearned;
  @Column(columnDefinition = "TEXT")
  private String entranceExams;
}
