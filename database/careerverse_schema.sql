-- CareerVerse AI MySQL database schema
-- Run this first, then start Spring Boot backend.
-- Demo login users and sample records are also seeded automatically by backend DemoDataSeeder when app.seed-demo-data=true.

CREATE DATABASE IF NOT EXISTS careerverse_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE careerverse_ai;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255),
  profile_image TEXT,
  provider VARCHAR(20) NOT NULL DEFAULT 'LOCAL',
  provider_id VARCHAR(180),
  role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
  phone_number VARCHAR(30),
  location VARCHAR(100),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  education_level VARCHAR(120),
  current_course_or_class VARCHAR(180),
  stream VARCHAR(120),
  marks_or_cgpa DOUBLE,
  location VARCHAR(120),
  career_interest VARCHAR(180),
  skills TEXT,
  preferred_course VARCHAR(180),
  preferred_college_type VARCHAR(180),
  financial_requirement VARCHAR(180),
  CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trainer_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(160),
  experience VARCHAR(80),
  subjects VARCHAR(255),
  language VARCHAR(120),
  mode VARCHAR(120),
  location VARCHAR(120),
  rating DOUBLE,
  photo_url TEXT,
  demo_video_url TEXT,
  contact_email VARCHAR(160),
  about TEXT,
  CONSTRAINT fk_trainer_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS careers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(160) NOT NULL,
  slug VARCHAR(160) NOT NULL UNIQUE,
  category VARCHAR(100),
  required_stream VARCHAR(180),
  salary_range VARCHAR(120),
  demand_level VARCHAR(80),
  description TEXT,
  course_path TEXT,
  skills TEXT,
  roadmap TEXT,
  job_roles TEXT,
  future_scope TEXT
);

CREATE TABLE IF NOT EXISTS courses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160),
  stream VARCHAR(120),
  duration VARCHAR(80),
  eligibility VARCHAR(255),
  fees_range VARCHAR(120),
  best_for_careers TEXT,
  skills_learned TEXT,
  entrance_exams TEXT
);

CREATE TABLE IF NOT EXISTS colleges (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(180),
  category VARCHAR(120),
  district VARCHAR(120),
  location VARCHAR(160),
  college_type VARCHAR(160),
  fees_range VARCHAR(160),
  admission_mode VARCHAR(160),
  courses TEXT,
  official_link TEXT,
  placement_rating DOUBLE,
  hostel_available BOOLEAN
);

CREATE TABLE IF NOT EXISTS college_cutoffs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  college_id BIGINT,
  branch VARCHAR(120),
  category VARCHAR(80),
  cutoff_mark DOUBLE,
  year INT,
  district VARCHAR(120),
  CONSTRAINT fk_cutoff_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS internships (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180),
  company_name VARCHAR(160),
  role VARCHAR(120),
  duration VARCHAR(80),
  location VARCHAR(120),
  work_mode VARCHAR(80),
  stipend VARCHAR(120),
  apply_email VARCHAR(160),
  enquiry_email VARCHAR(160),
  company_website TEXT,
  eligibility TEXT,
  skills_required TEXT,
  responsibilities TEXT,
  selection_process TEXT
);

CREATE TABLE IF NOT EXISTS government_exams (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(180),
  category VARCHAR(120),
  conducting_body VARCHAR(180),
  eligibility VARCHAR(255),
  age_limit VARCHAR(180),
  qualification VARCHAR(180),
  selection_process TEXT,
  syllabus TEXT,
  preparation_plan TEXT,
  official_apply_link TEXT,
  result_link TEXT,
  admit_card_link TEXT
);

CREATE TABLE IF NOT EXISTS exam_updates (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_name VARCHAR(180),
  update_type VARCHAR(80),
  title VARCHAR(255),
  status VARCHAR(80),
  posted_date DATE,
  last_date DATE,
  description TEXT,
  official_link TEXT
);

CREATE TABLE IF NOT EXISTS guidance_videos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180),
  category VARCHAR(120),
  trainer_name VARCHAR(160),
  duration VARCHAR(80),
  language VARCHAR(120),
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS ai_tool_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  tool_name VARCHAR(120),
  prompt TEXT,
  response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ai_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS saved_careers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  career_id BIGINT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_saved_career_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_career_career FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_colleges (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  college_id BIGINT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_saved_college_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_college_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_internships (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  internship_id BIGINT,
  status VARCHAR(80) DEFAULT 'SAVED',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_saved_internship_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_internship_internship FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jobs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180),
  company_name VARCHAR(160),
  location VARCHAR(120),
  work_mode VARCHAR(80),
  salary VARCHAR(120),
  experience VARCHAR(120),
  apply_email VARCHAR(160),
  enquiry_email VARCHAR(160),
  company_website TEXT,
  eligibility TEXT,
  skills_required TEXT,
  responsibilities TEXT,
  selection_process TEXT
);

CREATE TABLE IF NOT EXISTS application_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(80),
  opportunity_id VARCHAR(120),
  name VARCHAR(160),
  email VARCHAR(160),
  phone VARCHAR(40),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
