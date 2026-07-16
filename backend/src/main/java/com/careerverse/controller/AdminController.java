package com.careerverse.controller;

import com.careerverse.model.*;
import com.careerverse.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private final TrainerProfileRepository trainers;
  private final GuidanceVideoRepository videos;
  private final CareerRepository careers;
  private final CollegeRepository colleges;
  private final InternshipRepository internships;
  private final JobPostRepository jobs;
  private final ExamUpdateRepository updates;

  public AdminController(TrainerProfileRepository trainers, GuidanceVideoRepository videos, CareerRepository careers,
                         CollegeRepository colleges, InternshipRepository internships, JobPostRepository jobs, ExamUpdateRepository updates) {
    this.trainers = trainers;
    this.videos = videos;
    this.careers = careers;
    this.colleges = colleges;
    this.internships = internships;
    this.jobs = jobs;
    this.updates = updates;
  }

  @PostMapping("/trainers") public TrainerProfile addTrainer(@RequestBody TrainerProfile t) { return trainers.save(t); }
  @PostMapping("/videos") public GuidanceVideo addVideo(@RequestBody GuidanceVideo v) { return videos.save(v); }
  @PostMapping("/careers") public Career addCareer(@RequestBody Career c) { return careers.save(c); }
  @PostMapping("/colleges") public College addCollege(@RequestBody College c) { return colleges.save(c); }
  @PostMapping("/internships") public Internship addInternship(@RequestBody Internship i) { return internships.save(i); }
  @PostMapping("/jobs") public JobPost addJob(@RequestBody JobPost j) { return jobs.save(j); }
  @PostMapping("/exam-updates") public ExamUpdate addExamUpdate(@RequestBody ExamUpdate e) { return updates.save(e); }

  @DeleteMapping("/{type}/{id}")
  public Map<String, String> delete(@PathVariable String type, @PathVariable Long id) {
    switch (type) {
      case "trainers" -> trainers.deleteById(id);
      case "videos" -> videos.deleteById(id);
      case "careers" -> careers.deleteById(id);
      case "colleges" -> colleges.deleteById(id);
      case "internships" -> internships.deleteById(id);
      case "jobs" -> jobs.deleteById(id);
      case "exam-updates" -> updates.deleteById(id);
      default -> throw new IllegalArgumentException("Unknown type: " + type);
    }
    return Map.of("message", "Deleted");
  }
}
