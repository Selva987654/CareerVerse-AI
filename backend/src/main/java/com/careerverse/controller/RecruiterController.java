package com.careerverse.controller;

import com.careerverse.model.JobPost;
import com.careerverse.model.ApplicationRecord;
import com.careerverse.repository.JobPostRepository;
import com.careerverse.repository.ApplicationRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {
  private final JobPostRepository jobs;
  private final ApplicationRecordRepository applications;

  public RecruiterController(JobPostRepository jobs, ApplicationRecordRepository applications) {
    this.jobs = jobs;
    this.applications = applications;
  }

  @GetMapping("/jobs")
  public List<JobPost> jobs() {
    return jobs.findAll();
  }

  @PostMapping("/jobs")
  public Map<String, Object> addJob(@RequestBody JobPost job) {
    JobPost saved = jobs.save(job);
    return Map.of("status", "success", "message", "Job post published", "job", saved);
  }

  @GetMapping("/applications") public List<ApplicationRecord> applications() { return applications.findAll(); }

  @PutMapping("/applications/{id}/status")
  public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
    List<String> allowed = List.of("Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Selected", "Rejected");
    String status = body.getOrDefault("status", "");
    if (!allowed.contains(status)) return ResponseEntity.badRequest().body(Map.of("message", "Unsupported application status"));
    return applications.findById(id).map(record -> { record.setStatus(status); applications.save(record); return ResponseEntity.ok(record); }).orElseGet(() -> ResponseEntity.notFound().build());
  }
}
