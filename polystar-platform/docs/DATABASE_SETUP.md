# Database Setup

## MongoDB Atlas

1. Create a MongoDB Atlas project.
2. Create a cluster and database named `polystar_platform`.
3. Add a database user with read/write access.
4. Add your application server IP addresses to Atlas network access.
5. Copy the connection string into `MONGODB_URI`.
6. Run `npm run seed` from the monorepo root to create the initial admin user and role.

## Collections

The backend defines Mongoose schemas for:

`users`, `admins`, `roles`, `permissions`, `services`, `projects`, `portfolio`, `case_studies`, `testimonials`, `partners`, `blog_posts`, `downloads`, `careers`, `quotations`, `consultations`, `site_visits`, `contacts`, `gallery`, `videos`, `documents`, `settings`, `translations`, `support_tickets`, `ticket_messages`, `clients`, `reports`, and `notifications`.

Indexes are configured for status, locale, slug, common text fields, authentication email, ticket requester, and ticket message relations.
