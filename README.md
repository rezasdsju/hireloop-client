# HireLoop - A Job Portal (Frontend)

HireLoop is a job portal where job seekers find and apply to jobs, recruiters post and manage
openings, and admins manage user accounts. All job posts are reviewed and controlled by an admin.

This repository contains the frontend, built with the Next.js App Router. It talks to a separate
Express + MongoDB API for job, application, user and payment data, and uses Better Auth for
accounts and sessions.

## Live Demo

**Frontend:** [https://hireloop-jobs-board.vercel.app](https://hireloop-jobs-board.vercel.app)

**Backend API:** [https://hireloop-jobs-server.vercel.app](https://hireloop-jobs-server.vercel.app)

## Related Repository

**Backend:** [HireLoop Server](https://github.com/rezasdsju/hireloop-server)

## Features

### Accounts and authentication

- Email and password sign up and sign in with Better Auth. Users and sessions are stored in
  MongoDB through the Better Auth MongoDB adapter.
- Role selection at sign up: **Job Seeker** or **Recruiter**. The role is a custom Better Auth
  field with a default of `seeker`.
- Optional profile photo at sign up. The selected file is previewed locally, uploaded to imgbb,
  and the returned URL is saved as the user's `image` field.
- Session-aware navbar: dashboard link for the signed-in role, profile menu, avatar, and sign out.
  Users without an image get a placeholder user icon.
- Role-protected dashboards. `app/dashboard/{seeker,recruiter,admin}/layout.tsx` call
  `requireRole()` and redirect to `/unauthorized` when the role does not match.
- Dashboard sidebar shows a Home link, the user's avatar, name, and role, plus the menu for
  that role.

### Homepage

- Hero section with a headline, the search form (`name="search"`, posting to `/browse-jobs`), a
  "Post a job" link to `/register` and trending role chips that open the matching search.
- Stats strip counted from the jobs the API returns: active jobs, companies hiring, remote roles
  and categories. It shows zeros instead of invented numbers when the API has no data.
- Featured jobs section with up to three open jobs rendered with the same job card as
  `/browse-jobs`, plus a link to the full list.
- Platform features section and a call to action that links to registration and job browsing.
- Shared footer with job seeker, employer and HireLoop links. Only routes that exist are linked.

### Job browsing

- Public job list at `/browse-jobs`, six jobs per page, with job cards showing the company
  initial, title, company, location/remote, salary, employment type and a closed badge.
- Keyword search: the hero form and the search bar on `/browse-jobs` submit `search` as a GET
  parameter, which the page passes to the API.
- Page links at the bottom of the list request the next slice of jobs and keep the current query
  string, so a search stays applied while paging.
- Job detail page at `/browse-jobs/[id]` with salary, location, type and deadline cards, the job
  description and qualifications, and a company overview panel.
- Apply flow on the job detail page:
  - Sends guests to `/sign-in?redirectTo=/browse-jobs/[id]`.
  - Only seekers can apply; other roles get an error toast.
  - Free seekers can submit up to five applications, then they are redirected to `/payment`.
  - Duplicate applications are rejected by the API with a 409.
  - Closed jobs disable the apply button.

### Seeker dashboard

- `/dashboard/seeker/applications` lists the signed-in seeker's own applications with status
  badges (pending, reviewing, interview, accepted, rejected) and summary counts for total, active
  and interview-stage applications.

### Recruiter dashboard

- `/dashboard/recruiter/jobs` lists the signed-in recruiter's jobs in a table with title,
  company, category, type, deadline and open/closed status. Each row links to that job's
  applications and offers a delete action with a confirmation dialog.
- `/dashboard/recruiter/jobs/new` creates a job post with title, company, category, employment
  type, remote toggle, location, deadline, salary range and frequency, responsibilities and
  qualifications. The recruiter id is always taken from the session.
- `/dashboard/recruiter/jobs/[id]/applications` shows applicant statistics and a table of the
  applications for that job, with search by applicant email, a status filter, an inline status
  update, and an email link per applicant.

### Admin dashboard

- `/dashboard/admin/users` lists all users with total, active, recruiter and suspended counts,
  search by name or email, a role filter, a per-user role change that is saved through the API,
  and CSV export of the filtered list.

### Payments

- `/payment` shows the HireLoop Pro order summary and a card form, and posts to
  `/api/checkout_sessions` to create a Stripe Checkout Session and redirect the user to Stripe.
- `/payment/success` reads the Checkout Session on the server, verifies it through the API,
  renders the receipt (amount, plan, billing email, payment method, paid date and a copyable
  transaction id) and links to the dashboard or the job list. Incomplete or unpaid sessions are
  redirected away instead of showing a receipt.

### UI

- Responsive layout with a mobile navigation sheet and a shared footer.
- Light and dark theme toggle backed by `next-themes`.
- Toast notifications for success and error states.
- Dashboard and list pages are built from the shared `shadcn`-style components in
  `components/ui`.

## Technologies

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components built on Base UI (`@base-ui/react`)
- Better Auth with the MongoDB adapter
- MongoDB driver (Better Auth data store)
- Stripe (`stripe` and `@stripe/stripe-js`)
- imgbb API for profile photo uploads
- next-themes, lucide-react, react-icons
- ESLint and Prettier

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A MongoDB connection string (Better Auth stores users and sessions there)
- The HireLoop API running locally, for example at `http://localhost:5000`

### Install and run

```bash
npm install
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env` file in the project root with the values below.

| Variable | Required | Used for |
|---|---|---|
| `MONGODB_URI` | Yes | Better Auth database connection (users, sessions, accounts) |
| `BETTER_AUTH_SECRET` | Yes | Better Auth session secret |
| `BETTER_AUTH_URL` | Yes | Base URL of the app, for example `http://localhost:3000` |
| `NEXT_PUBLIC_BASE_API_URL` | Yes | Base URL of the HireLoop API, for example `http://localhost:5000` |
| `STRIPE_SECRET_KEY` | Yes (payments) | Creating and reading Stripe Checkout Sessions on the server |
| `NEXT_PUBLIC_IMAGEBB_API_KEY` | Yes (photo upload) | Uploading the optional sign-up profile photo to imgbb |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional | Google provider configured in `lib/auth.ts` |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | Optional | GitHub provider configured in `lib/auth.ts` |

Stripe is initialized lazily in `lib/stripe.ts`, so the app still builds and starts without
`STRIPE_SECRET_KEY`; only the payment routes fail until the key is present.

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run format` | Format files with Prettier |

## Project Structure

```text
app/
  (auth)/                 Sign-in and register pages with their layout
  api/auth/[...all]/      Better Auth route handler
  api/checkout_sessions/  Creates a Stripe Checkout Session
  browse-jobs/            Public job list and job detail pages
  dashboard/              Role-guarded dashboards and sidebar layout
  payment/                Checkout page and success receipt
  unauthorized/           Shown when a role check fails
  components/             Page-level components (jobs, users, applications, browse jobs)
components/
  auth/                   Sign-in and register forms
  homepage/                Landing page sections (hero, stats, featured jobs, features, call to action)
  shared/                  Site footer
  shared/navbar/          Navbar, mobile menu, profile menu, avatar
  ui/                     shadcn/ui component wrappers
lib/
  actions/                Server actions used by client components
  api/                    Requests to the Express API
  core/server.ts          getSession, getToken, authFetch, protectedMutation, requireRole
  jobs/, users/, applications/  Formatting helpers and option lists
  auth.ts, auth-client.ts Better Auth server and client setup
types/                    Shared TypeScript types
```

## How the app talks to the API

Server components read the session with `auth.api.getSession()` through `lib/core/server.ts`.
Server actions in `lib/actions` send the Better Auth session token as a Bearer token with
`authFetch` / `protectedMutation`, and the Express API validates that token against the `session`
collection before allowing a request.

Endpoints used by the frontend:

| Method | Endpoint | Used by |
|---|---|---|
| `GET` | `/jobs` | Job list, with `recruiterId`, `search`, `jobType`/`type`, `isRemote`, `category` |
| `GET` | `/jobs/:id` | Job detail page |
| `POST` | `/jobs` | Recruiter create job (recruiter only) |
| `DELETE` | `/jobs/:id` | Recruiter delete job (owner or admin) |
| `GET` | `/applications` | Applicant lists; seekers receive only their own |
| `GET` | `/applications/count` | Free-application limit check |
| `POST` | `/applications` | Apply to a job (seekers only, duplicates rejected) |
| `PATCH` | `/applications/:id` | Recruiter or admin status update |
| `GET` | `/users` | Admin user management (admin only) |
| `GET` | `/users/:id/premium` | Premium check before applying |
| `PATCH` | `/users/:id/role` | Admin role change (admin only) |
| `POST` | `/payments/checkout-verify` | Payment success page verification |

## Not implemented yet

These parts are built as UI only, or are still placeholders, so nothing here is claimed as working:

- The filter checkboxes and the sort select on `/browse-jobs` are UI only: ticking a box or
  changing the sort order does not update the query string yet. The page and the API already
  understand `jobType`, `isRemote` and `category` in the URL; the API has no sort parameter.
- The bookmark buttons on job cards and the job detail page have no handler.
- The Google and GitHub buttons on the sign-in and register forms are not connected to
  `authClient.signIn.social` yet.
- Admin suspend and delete user actions only update the local table; no API endpoint persists them.
- `/dashboard/recruiter/jobs/[id]` is a placeholder page; recruiter job work happens on
  `/dashboard/recruiter/jobs` and `/dashboard/recruiter/jobs/[id]/applications`.
- The three role dashboard landing pages show a heading only.
- Navbar and mobile menu links to `/company` and `/pricing` do not have pages yet.

## Deployment

The frontend is deployed on Vercel. Set the environment variables listed above in the Vercel
project settings, and point `NEXT_PUBLIC_BASE_API_URL` at the deployed API.
