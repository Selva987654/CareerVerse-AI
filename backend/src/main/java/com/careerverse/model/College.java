package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "colleges")
public class College {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String category;
  private String district;
  private String location;
  private String collegeType;
  private String feesRange;
  private String admissionMode;
  @Column(columnDefinition = "TEXT")
  private String courses;
  @Column(columnDefinition = "TEXT")
  private String officialLink;
  private Double placementRating;
  private Boolean hostelAvailable;
}
