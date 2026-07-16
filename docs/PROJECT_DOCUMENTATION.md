# CareerVerse AI — A to Z Project Documentation

This document is the complete developer, tester, administrator, and handover guide for CareerVerse AI.

## A — Application purpose

CareerVerse AI is a career-guidance platform for school students, college students, graduates, parents, colleges, recruiters, mentors, and administrators. It supports career discovery, courses, exams, colleges, scholarships, official education loans, jobs, internships, AI tools, profiles, applications, and role dashboards.

The application has two data modes:

1. Demo accounts use seeded demo profiles and demo saved items for predictable testing.
2. Google, local registered, and database users use only their own profile, saves, applications, and role data.

## B — Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, React Router 6 |
| Styling | Tailwind CSS, Lucide icons |
| Backend | Java 17, Spring Boot 3.3, Spring Security |
| Database | MySQL 8+ with JPA/Hibernate |
| Authentication | JWT email/password and optional Google OAuth2 |
| AI | Optional Gemini API with safe fallback responses |
| Build | npm/Vite and Maven |

## C — Code structure

```text
frontend/src
  components/       reusable UI and dashboard panels
  context/          AuthContext and AppContext
  data/             frontend catalogue and demo profile data
  layouts/          shared dashboard shell
  pages/            public, protected, AI, and dashboard pages
  routes/           ProtectedRoute
  services/         backend API client
  types/            shared TypeScript contracts
  utils/            profile-based feature access rules

backend/src/main/java/com/careerverse
  config/            security, CORS, application configuration
  controller/        auth, profile, public, recruiter, AI APIs
  dto/               request and response records
  model/             JPA entities
  repository/        Spring Data repositories
  security/          JWT filter and security support
  seed/              demo users and catalogue seed data

database/
  careerverse_schema.sql
  demo_logins.md
docs/
  PROJECT_DOCUMENTATION.md
```

## D — Demo accounts

Demo accounts are created by `DemoDataSeeder` when `SEED_DEMO_DATA=true`.

| Role | Email | Password | Dashboard |
|---|---|---|---|
| Student | student@careerverse.demo | demo123 | `/student-dashboard` |
| Parent | parent@careerverse.demo | demo123 | `/parent-dashboard` |
| College | college@careerverse.demo | demo123 | `/college-dashboard` |
| Recruiter | recruiter@careerverse.demo | demo123 | `/recruiter-dashboard` |
| Mentor | trainer@careerverse.demo | demo123 | `/mentor-dashboard` |
| Admin | admin@careerverse.demo | admin123 | `/admin-dashboard` |

Demo mode intentionally displays demo profile information and demo saved careers, courses, and opportunities. Demo state is stored under a `cv_demo_<userId>_...` browser key and never mixed with real users.

## E — Environment configuration

Backend defaults are in `backend/src/main/resources/application.properties`. Use environment variables for local or production values.

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/careerverse_ai?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Kolkata&allowPublicKeyRetrieval=true"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="YOUR_MYSQL_PASSWORD"
$env:FRONTEND_URL="http://localhost:5173"
$env:JWT_SECRET="replace-with-a-secret-at-least-32-characters-long"
$env:SEED_DEMO_DATA="true"
$env:GEMINI_API_KEY="dummy"
$env:GOOGLE_CLIENT_ID="dummy"
$env:GOOGLE_CLIENT_SECRET="dummy"
```

Frontend `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8081
VITE_GOOGLE_AUTH_URL=http://localhost:8081/api/auth/google/start
```

Never put Gemini or Google client secrets in frontend code.

## F — Feature catalogue

- Discover: assessment, career quiz, stream selector, career comparison.
- Career Guide: careers, details, career switch, career passport.
- Courses and Exams: course explorer, entrance exams, government exams, live updates.
- Colleges and Counselling: college finder, scholarships, education loans, counselling.
- Internships and Jobs: official/live listings, application tracking, trending courses, placement training.
- AI Tools: career quiz, career path, skill gap, readiness, resume, LinkedIn, mock interview, internship email, government exam advisor, career comparison, career twin, future-me simulator.
- Role dashboards: student, parent, college, recruiter, mentor, and admin.

## G — Google login flow

1. User chooses a role on `/login`.
2. Frontend redirects to `/api/auth/google/start?role=<role>`.
3. Backend stores the requested role in a short-lived cookie.
4. Google authenticates the user.
5. Backend creates or refreshes the user and redirects to `/auth/callback` with a JWT and user payload.
6. Frontend stores the session and calls `/api/auth/me`.
7. New Google users are sent to `/profile-setup`; returning users go to their role dashboard.

Required Google Cloud settings:

```text
Authorized JavaScript origin: http://localhost:5173
Authorized redirect URI: http://localhost:8081/login/oauth2/code/google
```

## H — Home and navigation behavior

`Navbar.tsx` keeps the existing navigation style and filters authenticated student links through `profileAccess.ts`. Unknown or incomplete student profiles keep general discovery links visible until onboarding is complete.

The existing routes are not deleted. The visibility layer only hides irrelevant links or tabs for the current profile.

## I — Identity and session storage

`AuthContext.tsx` owns:

- current user
- JWT token
- loading state
- logout
- profile hydration
- demo-account detection

Browser keys:

```text
cv_auth_user
cv_auth_token
cv_user_<id>_<state>
cv_demo_<id>_<state>
cv_guest_<state>
```

Real users never read demo state. The first authenticated real user can receive a one-time migration of older unsoped save keys; those legacy keys are then deleted.

## J — Jobs, internships, and applications

The Jobs page combines backend jobs/internships with the local catalogue. Each item supports:

- details page
- apply email / website link
- application tracking
- save/bookmark
- application history
- withdraw application

Applications are stored in the authenticated user’s scoped AppContext state in the current frontend implementation. A future production version should move them fully to an authenticated backend table keyed by user ID.

## K — Knowledge and official loan sources

Education loan cards are not invented marketplace data. Each record includes an official source and application link. Current records cover:

- Vidya Lakshmi / PM-Vidyalaxmi portal
- SBI Student Loan Scheme
- SBI Global Ed-Vantage
- Bank of Baroda Baroda Vidya Loan
- ICICI Bank Education Loan

Rates are labelled variable or provider-specific where the official provider does not promise one universal rate. Users are directed to read the provider’s current terms before applying. CareerVerse does not collect loan payments or applications.

## L — Login and role authorization

The frontend sends the selected role to `/api/auth/login`. The backend maps:

```text
student  -> STUDENT
parent   -> PARENT
college  -> COLLEGE
recruiter -> RECRUITER
mentor   -> TRAINER
admin    -> ADMIN
```

`ProtectedRoute` checks authentication and role access. `DashboardRedirect` sends a logged-in user to the dashboard matching the role returned by the backend.

The recruiter API is protected by Spring Security and accepts `RECRUITER` or `ADMIN` roles. Admin APIs require `ADMIN`.

## M — MySQL database

Important tables:

- `users`: identity, role, provider, password hash, profile completion.
- `student_profiles`: education level, current course/class, stream, location, skills, interest, financial requirement.
- `role_profiles`: parent, recruiter, college, and mentor JSON profile data.
- `careers`, `courses`, `colleges`, `college_cutoffs`.
- `government_exams`, `exam_updates`, `guidance_videos`.
- `jobs`, `internships`, `application_records`.
- `ai_tool_logs` and saved-content tables for future backend persistence.

Hibernate is configured with `ddl-auto=update` for local development. For production, use versioned migrations such as Flyway or Liquibase.

## N — Onboarding and profile personalization

Student onboarding stores:

- education level
- current course or class
- stream or department
- marks/CGPA
- preferred location
- career interest
- skills
- preferred course
- preferred college type
- financial requirement

The student stage classifier maps profiles to `school`, `college`, `graduate`, or `unknown`. It controls relevant navigation, hub tabs, AI tools, and dashboard quick actions.

## O — API overview

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/register` | local registration |
| `POST /api/auth/login` | local login |
| `GET /api/auth/me` | current authenticated user |
| `GET /api/auth/demo-users` | demo credential reference |
| `GET /api/profile/student` | current student profile |
| `POST /api/profile/student` | save student onboarding |
| `GET /api/profile/role` | role profile |
| `POST /api/profile/role` | save parent/college/recruiter/mentor profile |
| `GET /api/recruiter/jobs` | recruiter posts |
| `POST /api/recruiter/jobs` | publish recruiter post |
| `GET /api/public/*` | public catalogue data |
| `POST /api/ai/generate` | authenticated AI request |

## P — Parent workflow

1. Choose Parent Login.
2. Use demo credentials or local/Google account.
3. Complete parent profile if required.
4. Open Parent Dashboard.
5. Review child guidance, streams, scholarships, education loans, colleges, and saved items.

Parents can save public careers, courses, and opportunities. Their saved panel is separate from the student’s panel.

## Q — Quality and validation

Run frontend checks:

```bash
cd frontend
npm run typecheck
npm run lint
npm run build
```

Run backend checks:

```bash
cd backend
mvn test
mvn -DskipTests compile
```

Manual smoke test every role:

1. Login.
2. Confirm correct dashboard URL.
3. Confirm profile card and role actions.
4. Save a career/course/job.
5. Refresh the browser.
6. Confirm the item remains in the same user’s dashboard.
7. Logout and login as another user.
8. Confirm the previous user’s saved item is not visible.

## R — Recruiter workflow

1. Login as recruiter.
2. Complete recruiter/company profile.
3. Open Recruiter Dashboard.
4. Publish a job or internship.
5. Confirm the post appears through the public jobs API/page.
6. Use candidate filters, readiness tools, and outreach AI tools.

Real recruiter accounts now receive the same functional dashboard as seeded demo recruiters; only the profile and saved data differ.

## Registration — local new-user workflow

The `/register` page calls `POST /api/auth/register`, starts a JWT session, and sends the new user to profile setup. Students use `/complete-profile`; parents, colleges, recruiters, and mentors use `/profile-setup`. Admin accounts cannot be created through public registration.

## S — Saved and liked content

Current save actions:

- career heart/save buttons
- course bookmark buttons
- job/internship bookmark buttons
- career roadmap save buttons

The shared `SavedItemsPanel` is mounted in all role dashboards. It shows saved careers, courses, known catalogue opportunities, and IDs for live backend opportunities. Save state persists in localStorage scoped to the authenticated user or demo account.

## T — Troubleshooting

### Blank page

Check the browser console first. The provider order must remain:

```text
BrowserRouter
  App
    AuthProvider
      AppProvider
```

Restart Vite and hard-refresh the browser:

```bash
cd frontend
npm run dev
```

### Login says backend unavailable

- Confirm MySQL is running.
- Confirm Spring Boot is running on port 8081.
- Confirm `VITE_API_BASE_URL` is correct.
- Open `http://localhost:8081/api/auth/demo-users`.

### Demo users missing

Set `SEED_DEMO_DATA=true`, start the backend, and verify the database connection.

### Google login fails

Check Google redirect URI, client ID, client secret, cookie/role handling, and `FRONTEND_URL`.

### Saves look empty after an old update

Log in once as the intended user. The one-time legacy save migration moves older global keys into that account. Clear browser storage only when intentionally resetting demo data.

## U — User data rules

- Do not show one user’s saved items to another user.
- Do not put secrets in React code.
- Do not use fake loan application links.
- Do not treat demo data as verified production data.
- Use official provider pages for rates, deadlines, eligibility, and applications.
- Validate role authorization on the backend, not only in the frontend.

## V — Verification checklist

### Authentication

- local registration
- local login
- logout
- session restoration
- wrong role rejection
- Google OAuth callback
- protected route login prompt

### Profile

- student onboarding
- parent profile
- college profile
- recruiter profile
- mentor profile
- demo profile fallback

### Dashboard

- correct role routing
- demo details visible
- real user details visible
- saved panel visible
- role actions available after login

### Content

- careers
- courses
- exams
- colleges
- scholarships
- official education loans
- jobs and internships
- AI tools

## W — Web and responsive behavior

The existing Tailwind responsive layout is preserved. Test at:

- 360px mobile width
- 768px tablet width
- 1024px laptop width
- 1440px desktop width

Check mobile navigation, filter wrapping, modal scrolling, tables, cards, buttons, and external links.

## X — Extension points

The safest extension points are:

- add a feature to `ProfileFeature` and `stageFeatures` for personalization;
- add catalogue records under `frontend/src/data` for demo-only content;
- add JPA entity/repository/controller for production-backed data;
- add an authenticated API method in `services/api.ts`;
- add a dashboard panel without changing existing routes;
- add a migration before changing existing database fields.

## Y — Year-two production improvements

Recommended next phase:

1. Move saved items and applications from localStorage to authenticated backend tables.
2. Add refresh-token rotation and server-side logout/revocation.
3. Add email verification and password reset.
4. Add real-time official exam and scholarship update ingestion with admin approval.
5. Add loan-rate timestamps and scheduled provider-page verification.
6. Add parent-child account linking with consent.
7. Add recruiter ownership so companies see only their own posts and applicants.
8. Add college-level student privacy controls and placement permissions.

## Z — Final handover checklist

- Start MySQL.
- Configure backend environment.
- Start Spring Boot on port 8081.
- Configure frontend `.env`.
- Start Vite.
- Verify all six demo logins.
- Verify Google OAuth only after real credentials are configured.
- Run typecheck, lint, build, and backend compile/test.
- Never commit passwords, JWT secrets, Gemini keys, Google secrets, or production database credentials.
- Review official loan and scholarship pages before publishing current rates or deadlines.

## Change ownership notes

The most important files for future maintainers are:

- `frontend/src/context/AuthContext.tsx` — authentication and profile hydration.
- `frontend/src/context/AppContext.tsx` — user/demo saved state and applications.
- `frontend/src/utils/profileAccess.ts` — profile-based visibility policy.
- `frontend/src/data/demoProfiles.ts` — demo role details.
- `frontend/src/components/dashboard/SavedItemsPanel.tsx` — saved-content dashboard display.
- `frontend/src/pages/EducationLoans.tsx` — official loan catalogue and filters.
- `backend/src/main/java/com/careerverse/seed/DemoDataSeeder.java` — demo database data.
- `backend/src/main/java/com/careerverse/config/SecurityConfig.java` — backend authorization.
- `database/careerverse_schema.sql` — database reference schema.
