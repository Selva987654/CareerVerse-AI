# CareerVerse AI demo database logins

These accounts are created by Spring Boot `DemoDataSeeder` when `app.seed-demo-data=true`.
They are not hardcoded frontend users.

| Role | Email | Password |
|---|---|---|
| Student | student@careerverse.demo | demo123 |
| Parent | parent@careerverse.demo | demo123 |
| College / Placement Officer | college@careerverse.demo | demo123 |
| Trainer / Mentor | trainer@careerverse.demo | demo123 |
| Recruiter | recruiter@careerverse.demo | demo123 |
| Admin | admin@careerverse.demo | admin123 |

Production change:
- Set `app.seed-demo-data=false`
- Delete demo users from MySQL
- Create real admin with a strong BCrypt password
