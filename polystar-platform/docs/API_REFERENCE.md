# API Reference

Base URL: `/api/v1`

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

## Public Content

- `GET /projects`
- `GET /projects/:id`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `GET /portfolio`
- `POST /portfolio`
- `GET /blog`
- `GET /blog/:slug`
- `POST /blog`
- `GET /services`
- `POST /services`

## Requests

- `POST /contact`
- `POST /quotation`
- `POST /consultation`
- `POST /site-visit`

Protected admin CRUD:

- `/contacts`
- `/quotations`
- `/consultations`
- `/site-visits`

## Support Tickets

- `GET /tickets`
- `POST /tickets`
- `GET /tickets/:id`
- `POST /tickets/:id/reply`
- `PUT /tickets/:id/close`

## Uploads

- `POST /uploads`

Upload body is `multipart/form-data` with a `file` field and optional `folder`.

## Settings

- `GET /settings/public`
- `GET /settings`
- `GET /settings/:key`
- `PUT /settings/:key`
- `DELETE /settings/:key`

## Translations

- `GET /translations/public/:locale`
- `GET /translations`
- `POST /translations`
- `DELETE /translations/:locale/:namespace/:key`

## Analytics

- `POST /analytics/events`
- `GET /analytics/events`
- `GET /analytics/summary`

Admin CRUD routes also exist for users, admins, roles, permissions, case studies, testimonials, partners, downloads, careers, contacts, gallery, videos, documents, settings, translations, clients, reports, and notifications.
