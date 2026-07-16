package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "guidance_videos")
public class GuidanceVideo {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String category;
  private String trainerName;
  private String duration;
  private String language;
  @Column(columnDefinition = "TEXT")
  private String description;
  @Column(columnDefinition = "TEXT")
  private String videoUrl;
  @Column(columnDefinition = "TEXT")
  private String thumbnailUrl;
}
