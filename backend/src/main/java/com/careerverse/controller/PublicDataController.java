package com.careerverse.controller;

import com.careerverse.model.ApplicationRecord;
import com.careerverse.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicDataController {
  private final CareerRepository careers;
  private final CourseRepository courses;
  private final CollegeRepository colleges;
  private final InternshipRepository internships;
  private final JobPostRepository jobs;
  private final GovernmentExamRepository exams;
  private final ExamUpdateRepository updates;
  private final TrainerProfileRepository trainers;
  private final GuidanceVideoRepository videos;
  private final ApplicationRecordRepository applications;

  public PublicDataController(CareerRepository careers, CourseRepository courses, CollegeRepository colleges,
                              InternshipRepository internships, JobPostRepository jobs,
                              GovernmentExamRepository exams, ExamUpdateRepository updates,
                              TrainerProfileRepository trainers, GuidanceVideoRepository videos,
                              ApplicationRecordRepository applications) {
    this.careers = careers;
    this.courses = courses;
    this.colleges = colleges;
    this.internships = internships;
    this.jobs = jobs;
    this.exams = exams;
    this.updates = updates;
    this.trainers = trainers;
    this.videos = videos;
    this.applications = applications;
  }

  @GetMapping("/careers") public List<?> careers() { return careers.findAll(); }
  @GetMapping("/careers/{slug}") public Object career(@PathVariable String slug) { return careers.findBySlug(slug).orElseThrow(); }
  @GetMapping("/courses") public List<?> courses() { return courses.findAll(); }
  @GetMapping("/colleges") public List<?> colleges() { return colleges.findAll(); }
  @GetMapping("/internships") public List<?> internships() { return internships.findAll(); }
  @GetMapping("/internships/{id}") public ResponseEntity<?> internship(@PathVariable Long id) {
    return internships.findById(id).<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
  @GetMapping("/jobs") public List<?> jobs() { return jobs.findAll(); }
  @GetMapping("/jobs/{id}") public ResponseEntity<?> job(@PathVariable Long id) {
    return jobs.findById(id).<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }
  @PostMapping("/applications") public Map<String, Object> apply(@RequestBody ApplicationRecord record) {
    ApplicationRecord saved = applications.save(record);
    return Map.of("status", "success", "message", "Application enquiry saved. Use Gmail/Mail button to send resume to HR also.", "id", saved.getId());
  }
  @GetMapping("/applications") public List<ApplicationRecord> applicationHistory(@RequestParam String email) {
    return applications.findByEmailIgnoreCaseOrderByCreatedAtDesc(email);
  }
  @DeleteMapping("/applications/{id}") public ResponseEntity<?> withdraw(@PathVariable Long id, @RequestParam String email) {
    return applications.findById(id).filter(a -> email.equalsIgnoreCase(a.getEmail())).map(a -> { applications.delete(a); return ResponseEntity.ok(Map.of("message", "Application withdrawn")); }).orElseGet(() -> ResponseEntity.notFound().build());
  }
  @GetMapping("/government-exams") public List<?> governmentExams() { return exams.findAll(); }
  @GetMapping("/exam-updates") public List<?> examUpdates() { return updates.findAll(); }
  @GetMapping("/trainers") public List<?> trainers() { return trainers.findAll(); }
  @GetMapping("/guidance-videos") public List<?> videos() { return videos.findAll(); }
}
