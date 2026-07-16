package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "careers")
public class Career {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String title;
  @Column(nullable = false, unique = true)
  private String slug;
  private String category;
  private String requiredStream;
  private String salaryRange;
  private String demandLevel;
  @Column(columnDefinition = "TEXT")
  private String description;
  @Column(columnDefinition = "TEXT")
  private String coursePath;
  @Column(columnDefinition = "TEXT")
  private String skills;
  @Column(columnDefinition = "TEXT")
  private String roadmap;
  @Column(columnDefinition = "TEXT")
  private String jobRoles;
  @Column(columnDefinition = "TEXT")
  private String futureScope;
}
