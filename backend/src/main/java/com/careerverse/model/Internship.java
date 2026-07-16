package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "internships")
public class Internship {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String companyName;
  private String role;
  private String duration;
  private String location;
  private String workMode;
  private String stipend;
  private String applyEmail;
  private String enquiryEmail;
  @Column(columnDefinition = "TEXT")
  private String companyWebsite;
  @Column(columnDefinition = "TEXT")
  private String eligibility;
  @Column(columnDefinition = "TEXT")
  private String skillsRequired;
  @Column(columnDefinition = "TEXT")
  private String responsibilities;
  @Column(columnDefinition = "TEXT")
  private String selectionProcess;
}
