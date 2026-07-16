# CareerVerse AI

CareerVerse AI is a full-stack career guidance demo app with a React + Vite frontend, a Spring Boot backend, and MySQL storage.

This README is the future runbook: use it when reopening the project later on the same machine or after extracting it into a new folder.

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Backend: Java 17, Spring Boot 3.3, Maven
- Database: MySQL
- Optional integrations: Google OAuth, Gemini API

## Project Structure

```text
CareerVerse_AI_Old_UI_Merged_Fixed_Project
|-- frontend
|   |-- src
|   |-- package.json
|   |-- .env.example
|-- backend
|   |-- src/main/java/com/careerverse
|   |-- src/main/resources/application.properties
|   |-- pom.xml
|-- database
|   |-- careerverse_schema.sql
|   |-- demo_logins.md
|-- README.md
```

## Prerequisites

Install these before running the app:

- Java 17
- Maven
- Node.js 18 or newer
- npm
- MySQL Server

Check versions:

```bash
java -version
mvn -version
node -v
npm -v
mysql --version
```

## Run Order

Always start the project in this order:

1. Start MySQL.
2. Create or verify the `careerverse_ai` database.
3. Start the Spring Boot backend on `http://localhost:8081`.
4. Start the React frontend on `http://localhost:5173`.

## First-Time Setup

### 1. Create Database

Open a terminal from the project root:

```bash
mysql -u root -p
```

Inside MySQL:

```sql
CREATE DATABASE IF NOT EXISTS careerverse_ai;
exit;
```

Optional: import the provided schema manually.

```bash
mysql -u root -p careerverse_ai < database\careerverse_schema.sql
```

The backend also has `spring.jpa.hibernate.ddl-auto=update`, so it can create or update tables when it starts.

### 2. Configure Backend

The backend reads environment variables from `backend/src/main/resources/application.properties`.

For local development, set these before running `mvn spring-boot:run`.

PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/careerverse_ai?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Kolkata&allowPublicKeyRetrieval=true"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="YOUR_MYSQL_PASSWORD"
$env:FRONTEND_URL="http://localhost:5173"
$env:JWT_SECRET="replace-with-a-random-secret-at-least-32-characters-long"
$env:SEED_DEMO_DATA="true"
$env:GEMINI_API_KEY="dummy"
$env:GOOGLE_CLIENT_ID="dummy-client-id"
$env:GOOGLE_CLIENT_SECRET="dummy-client-secret"
```

CMD:

```bat
set DB_URL=jdbc:mysql://localhost:3306/careerverse_ai?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Kolkata&allowPublicKeyRetrieval=true
set DB_USERNAME=root
set DB_PASSWORD=YOUR_MYSQL_PASSWORD
set FRONTEND_URL=http://localhost:5173
set JWT_SECRET=replace-with-a-random-secret-at-least-32-characters-long
set SEED_DEMO_DATA=true
set GEMINI_API_KEY=dummy
set GOOGLE_CLIENT_ID=dummy-client-id
set GOOGLE_CLIENT_SECRET=dummy-client-secret
```

If your local MySQL root user has no password, set `DB_PASSWORD` to an empty value.

### 3. Configure Frontend

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8081
VITE_GOOGLE_AUTH_URL=http://localhost:8081/api/auth/google/start
```

## Daily Run Commands

Use two terminals.

Terminal 1: backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

Backend smoke test:

```text
http://localhost:8081/api/auth/demo-users
```

Terminal 2: frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

If npm uses the wrong registry:

```bash
npm config set registry https://registry.npmjs.org/
npm install --registry=https://registry.npmjs.org/
npm run dev
```

## Build Checks

Frontend:

```bash
cd frontend
npm run typecheck
npm run build
```

Backend:

```bash
cd backend
mvn test
```

## Demo Login Accounts

Demo users are created by Spring Boot when `SEED_DEMO_DATA=true`.

| Role | Email | Password |
|---|---|---|
| Student | student@careerverse.demo | demo123 |
| Parent | parent@careerverse.demo | demo123 |
| College / Placement Officer | college@careerverse.demo | demo123 |
| Trainer / Mentor | trainer@careerverse.demo | demo123 |
| Recruiter | recruiter@careerverse.demo | demo123 |
| Admin | admin@careerverse.demo | admin123 |

## Optional Gemini Setup

The app works with demo AI fallback output when `GEMINI_API_KEY=dummy`.

For real Gemini responses:

1. Create an API key in Google AI Studio.
2. Set it only in the backend terminal:

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Never put Gemini API keys in the React frontend.

## Complete project documentation

For the full A-to-Z architecture, setup, authentication, demo-vs-real data rules, dashboards, saved items, official loans, APIs, troubleshooting, testing, and future roadmap, read [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md).

## Optional Google OAuth Setup

Google login needs real Google OAuth credentials.

In Google Cloud Console, use:

```text
Authorized JavaScript origin:
http://localhost:5173

Authorized redirect URI:
http://localhost:8081/login/oauth2/code/google
```

Then set:

```powershell
$env:GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
$env:GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

Database demo login still works without Google OAuth.

## Useful Pages

```text
/colleges-counselling
/internships-jobs
/trending-courses
/exams
/exams/jee-main
/government-exams
/switch
/ai-tools
```

## Troubleshooting

### Backend cannot connect to MySQL

- Make sure MySQL Server is running.
- Confirm the database exists: `careerverse_ai`.
- Check `DB_USERNAME` and `DB_PASSWORD`.
- Keep `allowPublicKeyRetrieval=true` in `DB_URL` for local MySQL 8 setups.

### Port already in use

Backend default port is `8081`.

Frontend default port is `5173`.

Stop the old process or change the port before starting again.

### Demo users are missing

Make sure the backend starts with:

```text
SEED_DEMO_DATA=true
```

Then restart the backend and check:

```text
http://localhost:8081/api/auth/demo-users
```

### npm install fails or times out

```bash
cd frontend
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install --registry=https://registry.npmjs.org/
```

If needed on Windows CMD:

```bat
rmdir /s /q node_modules
del package-lock.json
npm install --registry=https://registry.npmjs.org/
```

## Notes For Future Updates

- Keep secrets out of the frontend.
- Prefer environment variables for backend secrets instead of committing real keys.
- Keep demo data enabled for local demos and disabled for production.
- Verify official exam, admission, scholarship, and job links before real use.
