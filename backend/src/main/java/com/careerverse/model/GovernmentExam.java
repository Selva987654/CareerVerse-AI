package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "government_exams")
public class GovernmentExam {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String category;
  private String conductingBody;
  private String eligibility;
  private String ageLimit;
  private String qualification;
  @Column(columnDefinition = "TEXT")
  private String selectionProcess;
  @Column(columnDefinition = "TEXT")
  private String syllabus;
  @Column(columnDefinition = "TEXT")
  private String preparationPlan;
  @Column(columnDefinition = "TEXT")
  private String officialApplyLink;
  @Column(columnDefinition = "TEXT")
  private String resultLink;
  @Column(columnDefinition = "TEXT")
  private String admitCardLink;
}
