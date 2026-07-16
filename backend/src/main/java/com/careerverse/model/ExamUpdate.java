package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
@Entity
@Table(name = "exam_updates")
public class ExamUpdate {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String examName;
  private String updateType;
  private String title;
  private String status;
  private LocalDate postedDate;
  private LocalDate lastDate;
  @Column(columnDefinition = "TEXT")
  private String description;
  @Column(columnDefinition = "TEXT")
  private String officialLink;
}
