package com.careerverse.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {
  @Value("${gemini.api.key:dummy}")
  private String apiKey;
  @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
  private String apiUrl;

  private final RestClient restClient = RestClient.create();

  @SuppressWarnings("unchecked")
  public String generate(String prompt) {
    if (apiKey == null || apiKey.isBlank() || apiKey.equalsIgnoreCase("dummy") || apiKey.contains("PASTE") || apiKey.contains("YOUR_")) {
      return fallback(prompt);
    }
    try {
      Map<String, Object> body = Map.of(
        "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
      );
      Map<String, Object> response = restClient.post()
        .uri(apiUrl + "?key=" + apiKey)
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .body(Map.class);
      var candidates = (List<Map<String, Object>>) response.get("candidates");
      var content = (Map<String, Object>) candidates.get(0).get("content");
      var parts = (List<Map<String, Object>>) content.get("parts");
      return String.valueOf(parts.get(0).get("text"));
    } catch (Exception ex) {
      return fallback(prompt) + "\n\nNote: Live Gemini API call failed, so CareerVerse used demo AI guidance. Check GEMINI_API_KEY, internet and model URL.";
    }
  }

  private String fallback(String prompt) {
    String lower = prompt == null ? "" : prompt.toLowerCase();
    if (lower.contains("career quiz")) {
      return "AI Career Quiz Result:\n1. Top matches: Software Developer, Data Analyst, UI/UX Designer, Government Exam Path, and Business Analyst.\n2. Choose based on marks, interest, budget, location and daily learning time.\n3. Start with one course path, one portfolio project, and one internship target.\n4. Next 30 days: finish basics and update resume. 60 days: build 2 projects. 90 days: apply for internships or entrance preparation.\n5. Verify all admission, exam and scholarship details from official portals.";
    }
    if (lower.contains("resume")) {
      return "AI Resume Guidance:\n1. Add a clear career objective based on the target role.\n2. Put technical skills first.\n3. Add 2-3 projects with problem, technology and result.\n4. Use action verbs like built, designed, developed, tested.\n5. Keep fresher resume to 1 page and export as PDF.";
    }
    if (lower.contains("linkedin")) {
      return "AI LinkedIn Guidance:\n1. Use a headline with target role, strongest skill and internship/job intent.\n2. Keep About section in 3 short parts: who you are, what you build, what opportunity you want.\n3. Add featured projects with technology, problem solved and GitHub/demo link.\n4. Post weekly about learning progress, project updates and interview preparation.\n5. Keep profile photo, location, skills and contact details updated.";
    }
    if (lower.contains("interview")) {
      return "AI Mock Interview Plan:\n1. Prepare self-introduction.\n2. Revise project architecture and database.\n3. Practice 10 technical questions for the role.\n4. Prepare HR answers for strengths, weakness and goals.\n5. After each answer, improve with STAR method.";
    }
    if (lower.contains("internship email") || lower.contains("application email")) {
      return "AI Internship Email:\nSubject: Application for Internship Opportunity\n\nDear Hiring Team,\nI am interested in applying for the internship role. I have relevant academic background, project experience and practical skills for this opportunity. I have attached my resume and would be happy to share project links or complete an assessment task.\n\nThank you for your time.\n\nFollow-up: Send a polite reminder after 5-7 days if there is no response.";
    }
    if (lower.contains("government") || lower.contains("exam")) {
      return "AI Government Exam Plan:\n1. Check eligibility and official notification.\n2. Download syllabus and previous papers.\n3. Study aptitude, reasoning, general studies and current affairs daily.\n4. Take weekly mock tests.\n5. Track apply/admit card/result only from official portals.";
    }
    if (lower.contains("skill gap")) {
      return "AI Skill Gap Plan:\n1. Learn the missing core skills first.\n2. Build one small project for each major skill gap.\n3. Add proof: GitHub repo, screenshots, certificate or live demo.\n4. Practice interview questions for the target role every week.\n5. Recheck readiness after 30 days and update your learning roadmap.";
    }
    if (lower.contains("placement readiness") || lower.contains("readiness analyzer")) {
      return "AI Placement Readiness Plan:\n1. Fix resume and LinkedIn first if either score is low.\n2. Add 2-3 strong portfolio or GitHub projects.\n3. Practice aptitude, reasoning and communication daily.\n4. Do one mock interview every week and improve answers using STAR format.\n5. Apply only after resume, project proof and interview basics are ready.";
    }
    if (lower.contains("future me")) {
      return "AI Future Me Simulation:\n1. In 5 years, your growth depends on consistent skill building, projects and internships.\n2. A strong path includes one specialization, measurable portfolio work and communication confidence.\n3. Your next step is to choose the first role, learn its tools and build proof of work.\n4. Review salary, demand and eligibility before making college or course decisions.";
    }
    if (lower.contains("career twin") || lower.contains("chat")) {
      return "CareerVerse AI Chat:\n1. Tell me your education level, interests, marks, location and target role.\n2. I can suggest careers, courses, skills, exams, internships and preparation steps.\n3. For official admissions or exam dates, always verify the official portal.";
    }
    if (lower.contains("career comparison") || lower.contains("compare")) {
      return "AI Career Comparison:\nCompare each option by eligibility, course path, skills, salary range, demand, difficulty, internships and long-term growth. Choose the option that matches your marks, interest, budget and daily learning time.";
    }
    if (lower.contains("career path") || lower.contains("roadmap")) {
      return "AI Career Roadmap:\n1. Pick one target career and check eligibility.\n2. Choose the right course or training path.\n3. Learn the top 5 skills required for the role.\n4. Build 2 projects or practical proofs.\n5. Apply for internships, prepare resume and practise interviews.";
    }
    return "CareerVerse AI Guidance:\n1. Choose one goal clearly.\n2. Check required course and eligibility.\n3. Build the missing skills with projects.\n4. Find colleges/training/internships using the platform.\n5. Prepare resume, email application and mock interview before applying.";
  }
}
