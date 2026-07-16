package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "trainer_profiles")
public class TrainerProfile {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false)
  private String name;
  private String category;
  private String experience;
  private String subjects;
  private String language;
  private String mode;
  private String location;
  private Double rating;
  @Column(name = "photo_url", columnDefinition = "TEXT")
  private String photoUrl;
  @Column(name = "demo_video_url", columnDefinition = "TEXT")
  private String demoVideoUrl;
  @Column(name = "contact_email")
  private String contactEmail;
  @Column(columnDefinition = "TEXT")
  private String about;
}
