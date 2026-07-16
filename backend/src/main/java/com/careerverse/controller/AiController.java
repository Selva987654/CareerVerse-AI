package com.careerverse.controller;

import com.careerverse.service.GeminiAiService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {
  private final GeminiAiService gemini;
  public AiController(GeminiAiService gemini) { this.gemini = gemini; }

  @PostMapping("/generate")
  public Map<String, String> generate(@RequestBody AiRequest request) {
    String prompt = "You are CareerVerse AI, an Indian career guidance assistant for students, parents, trainers and recruiters. "
      + "Use practical, safe guidance. Never invent official links; say to verify official portal links. "
      + "Return clean plain text only. Do not use asterisks, Markdown markers, tables, emojis or code fences. "
      + "Use short headings on their own line and numbered steps when useful. Keep every answer under 180 words with a maximum of 8 concise points. Make it easy for a beginner to understand. "
      + "Tool: " + request.tool() + "\nUser details:\n" + request.prompt();
    return Map.of("answer", gemini.generate(prompt));
  }

  public record AiRequest(String prompt, String tool) {}
}
