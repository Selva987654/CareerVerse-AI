# CareerVerse Backend

Spring Boot backend for CareerVerse AI.

## Run

```bash
mvn spring-boot:run
```

## Main APIs

- `POST /api/auth/login` database login
- `POST /api/auth/register` register user
- `GET /api/auth/me` current JWT user
- `GET /api/auth/demo-users` demo database credentials
- `GET /oauth2/authorization/google` Google login
- `POST /api/ai/generate` Gemini AI proxy
- `GET /api/public/careers`
- `GET /api/public/colleges`
- `GET /api/public/internships`
- `GET /api/public/trainers`
- `GET /api/public/government-exams`
- `POST /api/admin/trainers` admin trainer add
- `POST /api/admin/videos` admin guidance video add

## Important

Set real secrets in `src/main/resources/application.properties` before production.
