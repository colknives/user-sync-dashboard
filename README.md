# User Synchronization Dashboard

This project demonstrates a full-stack implementation of a **User Synchronization Dashboard** that simulates syncing user data with an external partner system (e.g., a CRM).

It is built using **Next.js (App Router)**, **TypeScript**, **Supabase (PostgreSQL)**, **Shadcn UI**, and **Tailwind CSS**, and showcases database design, serverless API handling, and frontend UX best practices.

---

## Features

- PostgreSQL-backed user database
- Dashboard displaying user sync status
- Serverless API to simulate external synchronization
- Per-user loading state and UX feedback
- Clean separation between frontend, backend, and database layers

---

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript
- **UI:** Shadcn UI, Tailwind CSS
- **Backend:** Next.js API Routes (Serverless)
- **Database:** PostgreSQL (Supabase)
- **Notifications:** Sonner (toast feedback)

---

## Prerequisites

Ensure you have the following installed:

- Node.js v18+
- npm (or pnpm/yarn)
- A Supabase account
- Git

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/colknives/user-sync-dashboard.git
cd user-sync-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup (Supabase / PostgreSQL)

1. Create a new project in Supabase
2. Go to SQL Editor
3. Run the following SQL to create the users table:

```bash
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  synced_at timestamptz null
);
```

4. Insert sample data:

```bash
insert into users (name, email, synced_at) values
('Alice Johnson', 'alice@example.com', null),
('Bob Smith', 'bob@example.com', now()),
('Charlie Lee', 'charlie@example.com', null),
('Dana Cruz', 'dana@example.com', null);
```

This ensures some users are already synced and others are pending.This ensures some users are already synced and others are pending.

### 4. Environment Variables

Create a .env file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Note:

The Service Role Key is used only on the server and must never be exposed to client-side code.

### 5. Run the Application

```bash
npm run dev
```

The app will be available at:The app will be available at:

```bash
http://localhost:3000
```

---

### How to Use the Application

1. Open http://localhost:3000
2. View the list of users and their sync status
3. Click “Sync Data” for users with Pending status
4. A loading state appears while simulating the external sync
5. Upon success, the user’s status updates to Synced

### Architecture & Design Decisions

#### Database (Supabase / PostgreSQL)

- PostgreSQL is used for reliable relational data storage
- The synced_at column is nullable to represent sync state
- UUID primary keys ensure uniqueness and scalability
- Database access is restricted to server-side code only

##### Why Supabase?

- Managed PostgreSQL
- Easy integration with Next.js
- Scales well for real-world SaaS use cases

#### Backend (Next.js API Route)

- A serverless API route handles user synchronization
- Accepts a user ID as input
- Simulates an external API call using a timed delay
- Updates the user’s synced_at timestamp on success
- Returns clear success or failure responses

#### Frontend (Next.js App Router)

- Server Components fetch initial user data
- Client Components handle interactions and async state
- UI built with Shadcn UI and Tailwind CSS
- Row-level loading states prevent duplicate requests
- Toast notifications provide user feedback
