package com.careerverse.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "users", indexes = @Index(name = "idx_users_email", columnList = "email", unique = true))
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "full_name", nullable = false, length = 120)
  private String fullName;

  @Column(nullable = false, unique = true, length = 160)
  private String email;

  @Column(length = 255)
  private String password;

  @Column(name = "profile_image", columnDefinition = "TEXT")
  private String profileImage;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Provider provider = Provider.LOCAL;

  @Column(name = "provider_id", length = 180)
  private String providerId;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Role role = Role.STUDENT;

  @Column(name = "is_demo_account")
  private Boolean demoAccount = false;

  @Column(name = "profile_completed")
  private Boolean profileCompleted = false;

  @Column(name = "phone_number", length = 30)
  private String phoneNumber;

  @Column(length = 100)
  private String location;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  void onUpdate() { updatedAt = LocalDateTime.now(); }

  public enum Provider { LOCAL, GOOGLE }
  public enum Role { STUDENT, PARENT, TRAINER, RECRUITER, COLLEGE, ADMIN }
}
