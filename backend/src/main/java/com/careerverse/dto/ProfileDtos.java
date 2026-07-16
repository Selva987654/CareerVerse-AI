package com.careerverse.dto;

public class ProfileDtos {
  public record StudentProfileRequest(
    String educationLevel,
    String currentCourseOrClass,
    String stream,
    Double marksOrCgpa,
    String location,
    String careerInterest,
    String skills,
    String preferredCourse,
    String preferredCollegeType,
    String financialRequirement
  ) {}
}
