package com.careerverse.seed;

import com.careerverse.model.*;
import com.careerverse.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DemoDataSeeder implements CommandLineRunner {
  private final PasswordEncoder encoder;
  private final UserRepository users;
  private final StudentProfileRepository studentProfiles;
  private final TrainerProfileRepository trainers;
  private final CareerRepository careers;
  private final CourseRepository courses;
  private final CollegeRepository colleges;
  private final CollegeCutoffRepository cutoffs;
  private final InternshipRepository internships;
  private final JobPostRepository jobs;
  private final GovernmentExamRepository exams;
  private final ExamUpdateRepository updates;
  private final GuidanceVideoRepository videos;

  @Value("${app.seed-demo-data:true}")
  private boolean seedDemo;

  public DemoDataSeeder(PasswordEncoder encoder, UserRepository users, StudentProfileRepository studentProfiles,
                        TrainerProfileRepository trainers, CareerRepository careers, CourseRepository courses,
                        CollegeRepository colleges, CollegeCutoffRepository cutoffs, InternshipRepository internships,
                        JobPostRepository jobs, GovernmentExamRepository exams, ExamUpdateRepository updates, GuidanceVideoRepository videos) {
    this.encoder = encoder;
    this.users = users;
    this.studentProfiles = studentProfiles;
    this.trainers = trainers;
    this.careers = careers;
    this.courses = courses;
    this.colleges = colleges;
    this.cutoffs = cutoffs;
    this.internships = internships;
    this.jobs = jobs;
    this.exams = exams;
    this.updates = updates;
    this.videos = videos;
  }

  @Override
  public void run(String... args) {
    if (!seedDemo) return;
    seedUsers();
    seedCareers();
    seedCourses();
    seedColleges();
    seedInternships();
    seedJobs();
    seedGovernmentExams();
    seedTrainersVideosUpdates();
  }

  private User user(String name, String email, String password, User.Role role) {
    User existing = users.findByEmailIgnoreCase(email).orElse(null);
    if (existing != null) {
      existing.setDemoAccount(true);
      existing.setProfileCompleted(true);
      existing.setProvider(User.Provider.LOCAL);
      existing.setRole(role);
      return users.save(existing);
    }
    return users.findByEmailIgnoreCase(email).orElseGet(() -> {
      User u = new User();
      u.setFullName(name);
      u.setEmail(email);
      u.setPassword(encoder.encode(password));
      u.setRole(role);
      u.setProvider(User.Provider.LOCAL);
      u.setDemoAccount(true);
      u.setProfileCompleted(true);
      u.setLocation("Coimbatore, Tamil Nadu");
      return users.save(u);
    });
  }

  private void seedUsers() {
    User student = user("Demo Student", "student@careerverse.demo", "demo123", User.Role.STUDENT);
    user("Demo Parent", "parent@careerverse.demo", "demo123", User.Role.PARENT);
    user("Demo College Officer", "college@careerverse.demo", "demo123", User.Role.COLLEGE);
    user("Demo Trainer", "trainer@careerverse.demo", "demo123", User.Role.TRAINER);
    user("Demo Recruiter", "recruiter@careerverse.demo", "demo123", User.Role.RECRUITER);
    user("CareerVerse Admin", "admin@careerverse.demo", "admin123", User.Role.ADMIN);

    if (studentProfiles.count() == 0) {
      StudentProfile p = new StudentProfile();
      p.setUser(student);
      p.setEducationLevel("BCA / Final year");
      p.setCurrentCourseOrClass("BCA final year");
      p.setStream("Computer Applications");
      p.setMarksOrCgpa(82.0);
      p.setLocation("Coimbatore");
      p.setCareerInterest("Full Stack Developer");
      p.setSkills("HTML, CSS, JavaScript, React, Java, MySQL");
      p.setPreferredCourse("Java Full Stack / MCA");
      p.setPreferredCollegeType("Tamil Nadu colleges with placement support");
      p.setFinancialRequirement("Scholarship first; loan for remaining fees");
      studentProfiles.save(p);
    }
  }

  private Career career(String title, String slug, String category, String stream, String salary, String demand, String desc, String path, String skills) {
    return careers.findBySlug(slug).orElseGet(() -> {
      Career c = new Career();
      c.setTitle(title);
      c.setSlug(slug);
      c.setCategory(category);
      c.setRequiredStream(stream);
      c.setSalaryRange(salary);
      c.setDemandLevel(demand);
      c.setDescription(desc);
      c.setCoursePath(path);
      c.setSkills(skills);
      c.setRoadmap("Learn basics → build projects → create GitHub/LinkedIn → complete internship → prepare aptitude/interview → apply for jobs.");
      c.setJobRoles(title + ", Junior Associate, Intern, Analyst, Specialist");
      c.setFutureScope("Strong scope when practical projects, communication and current tools are improved.");
      return careers.save(c);
    });
  }

  private void seedCareers() {
    if (careers.count() > 0) return;
    career("Full Stack Developer", "full-stack-developer", "Technology", "Computer Science / BCA / Any coding interest", "₹3 LPA - ₹12 LPA", "High", "Build frontend, backend, database and real web applications.", "BCA / B.Sc CS / BE CSE / MCA + Full Stack course", "HTML, CSS, JavaScript, React, Java, Spring Boot, MySQL, Git");
    career("Data Analyst", "data-analyst", "Technology", "Commerce / Science / Computer Applications", "₹3 LPA - ₹10 LPA", "High", "Analyze data, create reports and help companies make decisions.", "BCA / B.Sc / B.Com + Excel, SQL, Python, Power BI", "Excel, SQL, Python, Power BI, statistics, communication");
    career("Cyber Security Analyst", "cyber-security-analyst", "Technology", "Computer Science / IT", "₹4 LPA - ₹14 LPA", "High", "Protect systems, networks and applications from security threats.", "BCA / B.Sc IT / BE CSE + Networking + Security certifications", "Networking, Linux, security basics, tools, ethical hacking, reporting");
    career("UI UX Designer", "ui-ux-designer", "Design", "Any stream with design interest", "₹3 LPA - ₹9 LPA", "Medium-High", "Design user-friendly websites and apps.", "Any degree + UI/UX design course + portfolio", "Figma, wireframing, user research, visual design, prototyping");
    career("Chartered Accountant", "chartered-accountant", "Commerce", "Commerce", "₹6 LPA - ₹20 LPA", "High", "Handle accounting, audit, taxation and financial compliance.", "Commerce + CA Foundation → Intermediate → Articleship → Final", "Accounting, taxation, audit, finance, discipline");
    career("TNPSC Officer", "tnpsc-officer", "Government", "Any degree", "As per Tamil Nadu government pay scale", "High", "Work in Tamil Nadu government services through TNPSC exams.", "Any degree + TNPSC Group preparation", "Tamil Nadu GK, polity, aptitude, current affairs, writing practice");
  }

  private void seedCourses() {
    if (courses.count() > 0) return;
    course("BCA", "Computer Applications", "3 years", "12th pass", "₹30,000 - ₹1.5L/year", "Software Developer, Web Developer, Data Analyst", "Programming, database, web development", "College admission / merit");
    course("BE Computer Science", "Engineering", "4 years", "12th PCM", "₹50,000 - ₹2L/year", "Software Engineer, AI/ML Engineer, Cyber Security", "Programming, DSA, systems, projects", "TNEA / JEE / college admission");
    course("B.Com", "Commerce", "3 years", "12th commerce/any stream", "₹20,000 - ₹1L/year", "Banking, CA, finance, business", "Accounting, taxation, business, finance", "TNGASA / college admission");
    course("MBA", "Management", "2 years", "Any degree", "₹1L - ₹10L total", "Manager, HR, Marketing, Business Analyst", "Management, leadership, marketing, finance", "CAT / MAT / TANCET / college admission");
  }

  private void course(String name, String stream, String duration, String eligibility, String fees, String bestFor, String skills, String exams) {
    Course c = new Course();
    c.setName(name); c.setStream(stream); c.setDuration(duration); c.setEligibility(eligibility); c.setFeesRange(fees);
    c.setBestForCareers(bestFor); c.setSkillsLearned(skills); c.setEntranceExams(exams); courses.save(c);
  }

  private void seedColleges() {
    if (colleges.count() > 0) return;
    College skasc = college("Sri Krishna Arts and Science College", "Arts and Science", "Coimbatore", "Kuniamuthur", "Autonomous", "₹40,000 - ₹1.2L/year", "Merit / Management quota", "BCA, B.Sc CS, B.Com, BBA", "https://www.skasc.ac.in/", 4.3, true);
    College psg = college("PSG College of Technology", "Engineering", "Coimbatore", "Peelamedu", "Aided / Autonomous", "As per official admission", "TNEA / Management", "BE CSE, ECE, Mechanical, Civil", "https://www.psgtech.edu/", 4.7, true);
    College cit = college("Coimbatore Institute of Technology", "Engineering", "Coimbatore", "Civil Aerodrome Post", "Government Aided", "As per official admission", "TNEA", "BE CSE, IT, EEE, ECE, Mechanical", "https://www.cit.edu.in/", 4.5, true);
    College krishnaEng = college("Sri Krishna College of Engineering and Technology", "Engineering", "Coimbatore", "Kuniamuthur", "Autonomous", "As per official admission", "TNEA / Management", "BE CSE, IT, AI&DS, ECE", "https://www.skcet.ac.in/", 4.4, true);
    College govtArts = college("Government Arts College Coimbatore", "Arts and Science", "Coimbatore", "Race Course", "Government", "Low fee", "TNGASA", "B.A, B.Sc, B.Com, M.A, M.Sc", "https://www.gacbe.ac.in/", 4.2, false);
    College psgArts = college("PSG College of Arts & Science", "Arts and Science", "Coimbatore", "Civil Aerodrome Post", "Aided / Autonomous", "As per official admission", "Merit / Management", "B.Com, BBA, BCA, B.Sc, BA", "https://www.psgcas.ac.in/", 4.4, true);
    College loyola = college("Loyola College", "Arts and Science", "Chennai", "Nungambakkam", "Autonomous", "As per official admission", "Merit / Management", "BA, B.Com, BBA, B.Sc", "https://www.loyolacollege.edu/", 4.7, false);
    College mcc = college("Madras Christian College", "Arts and Science", "Chennai", "Tambaram", "Autonomous", "As per official admission", "Merit / Management", "BA, B.Com, B.Sc, Visual Communication", "https://mcc.edu.in/", 4.6, true);
    College american = college("American College", "Arts and Science", "Madurai", "Tallakulam", "Autonomous", "As per official admission", "Merit / Management", "BA, B.Com, B.Sc, BBA", "https://americancollege.edu.in/", 4.3, true);
    College bishop = college("Bishop Heber College", "Science", "Tiruchirappalli", "Trichy", "Autonomous", "As per official admission", "Merit / Management", "B.Sc, BCA, B.Com, BA", "https://bhc.edu.in/", 4.5, true);
    College jamal = college("Jamal Mohamed College", "Commerce", "Tiruchirappalli", "Trichy", "Autonomous", "As per official admission", "Merit / Management", "B.Com, BBA, BCA, M.Com", "https://jmc.edu/", 4.2, true);
    College grd = college("Dr. G.R. Damodaran College of Science", "Management", "Coimbatore", "Avinashi Road", "Autonomous", "As per official admission", "Merit / Management", "BBA, B.Com, MBA, BCA", "https://www.grd.org/", 4.1, true);
    cutoff(psg, "CSE", "OC", 198.5, 2025, "Coimbatore");
    cutoff(cit, "CSE", "OC", 196.0, 2025, "Coimbatore");
    cutoff(krishnaEng, "CSE", "OC", 190.0, 2025, "Coimbatore");
    cutoff(skasc, "BCA", "General", 80.0, 2025, "Coimbatore");
    cutoff(govtArts, "B.Com", "General", 85.0, 2025, "Coimbatore");
  }

  private College college(String name, String category, String district, String location, String type, String fees, String admission, String coursesText, String link, double rating, boolean hostel) {
    College c = new College();
    c.setName(name); c.setCategory(category); c.setDistrict(district); c.setLocation(location); c.setCollegeType(type);
    c.setFeesRange(fees); c.setAdmissionMode(admission); c.setCourses(coursesText); c.setOfficialLink(link); c.setPlacementRating(rating); c.setHostelAvailable(hostel);
    return colleges.save(c);
  }

  private void cutoff(College college, String branch, String category, double mark, int year, String district) {
    CollegeCutoff co = new CollegeCutoff();
    co.setCollege(college); co.setBranch(branch); co.setCategory(category); co.setCutoffMark(mark); co.setYear(year); co.setDistrict(district);
    cutoffs.save(co);
  }

  private void seedInternships() {
    if (internships.count() > 0) return;
    internship("React Frontend Intern", "AFTEC Global Solutions", "Frontend Developer", "1-3 months", "Coimbatore", "Hybrid", "Performance based", "hr@aftecglobalsolutions.com", "ags@aftecglobalsolutions.com", "https://aftecglobalsolutions.com", "BCA/B.Sc/BE students with React basics", "HTML, CSS, JS, React, Git", "Build UI pages, fix bugs, connect APIs", "Resume shortlist → task → interview");
    internship("Java Spring Boot Intern", "CareerVerse Demo Company", "Backend Developer", "2 months", "Remote", "Online", "Unpaid / Certificate", "careers@careerverse.demo", "support@careerverse.demo", "https://example.com", "Java basics, MySQL knowledge", "Java, Spring Boot, REST API, MySQL", "Create APIs, connect database, test endpoints", "Resume → technical interview → selection");
    internship("Data Analyst Intern", "Insight Analytics Demo", "Data Analyst", "2-4 months", "Chennai", "Remote", "₹5,000/month", "internships@insight.demo", "hello@insight.demo", "https://example.com", "Any degree with Excel/SQL basics", "Excel, SQL, Power BI, communication", "Clean data, prepare dashboards, weekly reports", "Portfolio review → interview");
    internship("Data Science Internship / Training Enquiry", "Indra Institute of Education", "Data Science Trainee", "Flexible / institute schedule", "Coimbatore", "Offline / Enquiry", "Training + internship certificate details from institute", "enquiry@indrainstitute.com", "info@indrainstitute.com", "https://indrainstitute.com/courses/data-scientist-master-programme/", "BCA/B.Sc/BE/MCA or any graduate interested in data science", "Python, SQL, Data Analysis, Machine Learning, Power BI", "Attend practical sessions, work on datasets, build final mini project", "Enquiry → counsellor call → batch confirmation → training/project");
    internship("AI & Machine Learning Course Enquiry", "Indra Institute of Education", "AI/ML Project Trainee", "Flexible / institute schedule", "Coimbatore", "Offline / Enquiry", "Training + project certificate details from institute", "info@indrainstitute.com", "enquiry@indrainstitute.com", "https://indrainstitute.com/artificial-intelligence/", "Students with basic programming interest", "Python, AI, Machine Learning, Deep Learning, Generative AI", "Learn AI fundamentals, practice ML tasks, build AI mini project", "Enquiry → timing confirmation → batch allocation");
    internship("Java Full Stack Training / Internship Enquiry", "Indra Institute of Education", "Java Full Stack Trainee", "Flexible / institute schedule", "Coimbatore", "Offline / Enquiry", "Training + placement support details from institute", "enquiry@indrainstitute.com", "info@indrainstitute.com", "https://indrainstitute.com/", "BCA/B.Sc CS/BE/MCA or coding beginners", "Java, Spring Boot, HTML, CSS, JavaScript, SQL", "Learn Java backend, build full-stack project, prepare interview points", "Enquiry → batch details → training confirmation → project work");
  }

  private void internship(String title, String company, String role, String duration, String location, String mode, String stipend, String apply, String enquiry, String website, String eligibility, String skills, String resp, String selection) {
    Internship i = new Internship();
    i.setTitle(title); i.setCompanyName(company); i.setRole(role); i.setDuration(duration); i.setLocation(location); i.setWorkMode(mode); i.setStipend(stipend);
    i.setApplyEmail(apply); i.setEnquiryEmail(enquiry); i.setCompanyWebsite(website); i.setEligibility(eligibility); i.setSkillsRequired(skills); i.setResponsibilities(resp); i.setSelectionProcess(selection);
    internships.save(i);
  }


  private void seedJobs() {
    if (jobs.count() > 0) return;
    job("Junior Full Stack Developer", "NextBridge Software", "Coimbatore", "On-site", "₹3.0 - ₹4.5 LPA", "Fresher / 0-1 year", "jobs@nextbridge.example", "hr@nextbridge.example", "https://example.com/nextbridge", "BCA/B.Sc/BE with project portfolio", "React, Java, Spring Boot, MySQL, Git", "Build full-stack features, Write clean APIs, Fix bugs, Coordinate with UI team", "Resume shortlist → Technical test → Technical interview → HR round");
    job("Data Analyst Trainee", "MetricMind Analytics", "Chennai", "Hybrid", "₹2.8 - ₹3.8 LPA", "Fresher", "hiring@metricmind.example", "talent@metricmind.example", "https://example.com/metricmind", "Any degree with SQL and Excel skills", "SQL, Excel, Power BI, Statistics", "Prepare reports, Analyze business data, Build dashboards, Explain findings", "Resume shortlist → Dataset task → Interview");
    job("Digital Marketing Executive", "GrowthHive Media", "Trichy", "Remote", "₹2.2 - ₹3.0 LPA", "Fresher / 1 year", "careers@growthhive.example", "hello@growthhive.example", "https://example.com/growthhive", "Any degree with marketing interest", "SEO, Social Media, Canva, Analytics, Content writing", "Manage campaigns, Write content, Track metrics, Improve engagement", "Resume shortlist → Content task → HR discussion");
  }

  private void job(String title, String company, String location, String mode, String salary, String exp, String apply, String enquiry, String website, String eligibility, String skills, String resp, String selection) {
    JobPost j = new JobPost();
    j.setTitle(title);
    j.setCompanyName(company);
    j.setLocation(location);
    j.setWorkMode(mode);
    j.setSalary(salary);
    j.setExperience(exp);
    j.setApplyEmail(apply);
    j.setEnquiryEmail(enquiry);
    j.setCompanyWebsite(website);
    j.setEligibility(eligibility);
    j.setSkillsRequired(skills);
    j.setResponsibilities(resp);
    j.setSelectionProcess(selection);
    jobs.save(j);
  }

  private void seedGovernmentExams() {
    if (exams.count() > 0) return;
    exam("UPSC Civil Services", "Civil Services", "Union Public Service Commission", "Graduation", "21-32 years usually; category relaxation as per notification", "Any degree", "Prelims → Mains → Interview", "GS, CSAT, Essay, Optional, Ethics, Current Affairs", "NCERT basics → newspaper → standard books → answer writing → mock tests", "https://upsconline.nic.in/", "https://upsc.gov.in/", "https://upsc.gov.in/");
    exam("SSC CGL", "Central Government", "Staff Selection Commission", "Graduation", "Depends on post", "Any degree", "Tier examination → Document verification", "Quant, Reasoning, English, General Awareness", "Daily aptitude/reasoning + PYQ + mock analysis", "https://ssc.gov.in/", "https://ssc.gov.in/", "https://ssc.gov.in/");
    exam("TNPSC Group II", "Tamil Nadu Government", "Tamil Nadu Public Service Commission", "Graduation", "As per TNPSC notification", "Any degree", "Prelims → Mains / Interview depending post", "General Tamil/English, General Studies, Aptitude, Tamil Nadu GK", "Tamil Nadu school books → current affairs → unit tests → PYQ", "https://apply.tnpscexams.in/", "https://tnpsc.gov.in/", "https://tnpsc.gov.in/");
    exam("RRB NTPC", "Railway", "Railway Recruitment Boards", "12th / Degree depending post", "As per RRB notification", "12th pass or degree", "CBT → skill/typing where applicable → DV", "Maths, Reasoning, General Awareness", "Speed practice + CBT mock tests + current affairs", "https://www.rrbapply.gov.in/", "https://www.rrbapply.gov.in/", "https://www.rrbapply.gov.in/");
    exam("IBPS PO", "Banking", "Institute of Banking Personnel Selection", "Graduation", "As per IBPS notification", "Any degree", "Prelims → Mains → Interview", "Reasoning, Quant, English, Banking Awareness", "Sectional tests → mocks → banking current affairs", "https://www.ibps.in/", "https://www.ibps.in/", "https://www.ibps.in/");
  }

  private void exam(String name, String category, String body, String eligibility, String age, String qualification, String selection, String syllabus, String prep, String apply, String result, String admit) {
    GovernmentExam e = new GovernmentExam();
    e.setName(name); e.setCategory(category); e.setConductingBody(body); e.setEligibility(eligibility); e.setAgeLimit(age); e.setQualification(qualification);
    e.setSelectionProcess(selection); e.setSyllabus(syllabus); e.setPreparationPlan(prep); e.setOfficialApplyLink(apply); e.setResultLink(result); e.setAdmitCardLink(admit);
    exams.save(e);
  }

  private void seedTrainersVideosUpdates() {
    if (trainers.count() == 0) {
      trainer("Ravi Kumar", "TNPSC & Government Exam Trainer", "7+ years", "General Studies, Tamil Nadu GK, Aptitude", "Tamil + English", "Online / Coimbatore", "Coimbatore", 4.8, "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", "ravi.trainer@careerverse.demo", "Helps students prepare for TNPSC Group II/IV and SSC foundation with weekly mock tests.");
      trainer("Priya Sharma", "Placement & Resume Trainer", "6+ years", "Resume, LinkedIn, HR interview, GD", "English + Tamil", "Online", "Chennai", 4.7, "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", "priya.trainer@careerverse.demo", "Guides students to improve resume, LinkedIn and mock interview confidence.");
      trainer("Arun Raj", "Banking & Aptitude Trainer", "5+ years", "Quant, Reasoning, Banking Awareness", "Tamil + English", "Hybrid", "Coimbatore", 4.6, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", "arun.trainer@careerverse.demo", "Specializes in IBPS, SSC aptitude and railway CBT practice plans.");
    }
    if (videos.count() == 0) {
      video("How to Choose Career After 12th", "Career Guidance", "Priya Sharma", "12 min", "Tamil + English", "Step-by-step guide to choose career, course and college.", "https://www.youtube.com/results?search_query=how+to+choose+career+after+12th");
      video("How to Apply for TNEA", "College Admission", "CareerVerse Guide", "10 min", "Tamil", "Official process overview and documents checklist.", "https://www.youtube.com/results?search_query=TNEA+how+to+apply");
      video("TNPSC Beginner Preparation Plan", "Government Exam", "Ravi Kumar", "18 min", "Tamil", "Syllabus, books, current affairs and mock test strategy.", "https://www.youtube.com/results?search_query=TNPSC+preparation+plan");
      video("Build Resume for Internship", "Placement Training", "Priya Sharma", "9 min", "English", "Fresher resume sections and project explanation tips.", "https://www.youtube.com/results?search_query=fresher+resume+for+internship");
    }
    if (updates.count() == 0) {
      update("TNPSC", "Notification", "Check latest TNPSC notifications", "Active", "Use TNPSC official portal for latest notification, application and result links.", "https://tnpsc.gov.in/");
      update("TNEA", "Counselling", "Engineering counselling official link", "Active", "Use the official TNEA portal and cutoff portal before final college choice.", "https://www.tneaonline.org/");
      update("SSC", "Vacancy", "SSC exam calendar and vacancy updates", "Active", "Check SSC official website before applying.", "https://ssc.gov.in/");
    }
  }

  private void trainer(String name, String cat, String exp, String subj, String lang, String mode, String loc, double rating, String photo, String email, String about) {
    TrainerProfile t = new TrainerProfile();
    t.setName(name); t.setCategory(cat); t.setExperience(exp); t.setSubjects(subj); t.setLanguage(lang); t.setMode(mode); t.setLocation(loc); t.setRating(rating); t.setPhotoUrl(photo); t.setContactEmail(email); t.setAbout(about);
    trainers.save(t);
  }

  private void video(String title, String cat, String trainer, String duration, String lang, String desc, String url) {
    GuidanceVideo v = new GuidanceVideo();
    v.setTitle(title); v.setCategory(cat); v.setTrainerName(trainer); v.setDuration(duration); v.setLanguage(lang); v.setDescription(desc); v.setVideoUrl(url); v.setThumbnailUrl("");
    videos.save(v);
  }

  private void update(String exam, String type, String title, String status, String desc, String link) {
    ExamUpdate u = new ExamUpdate();
    u.setExamName(exam); u.setUpdateType(type); u.setTitle(title); u.setStatus(status); u.setPostedDate(LocalDate.now()); u.setLastDate(LocalDate.now().plusDays(30)); u.setDescription(desc); u.setOfficialLink(link);
    updates.save(u);
  }
}
