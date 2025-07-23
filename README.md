# 🛠️ Issue Tracker – Built with Next.js App Router, Drizzle ORM & Tailwind

A modern, full-stack issue tracker app showcasing scalable architecture, strong typing, and developer-first tooling — all built with clean design principles and a production-ready mindset.

> ✅ Live Demo: [View on Vercel 🚀](https://issue-tracker-nextjs-2hy25rt26-meghas-projects-b9f0cded.vercel.app/)  
> 🧠 GitHub Repo: [meghalabs/issue-tracker-nextjs](https://github.com/meghalabs/issue-tracker-nextjs)

---

## ⚙️ Tech Stack

- **Framework**: Next.js (App Router, React Server Components)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) – type-safe SQL builder
- **Database**:
  - Local: **PostgreSQL**
  - Production: **[Neon](https://neon.tech/)** (serverless Postgres)
- **Validation**: [Zod](https://zod.dev/)
- **Auth**: NextAuth.js (Google OAuth)
- **UI**: Tailwind CSS + Radix UI
- **Types**: TypeScript
- **Deployment**: Vercel

---

## ✨ Features

- 📊 Dashboard to view issue summaries by status
- 🔧 Full CRUD: Create, Edit, Assign, and Delete issues
- 🔐 Secure login via Google OAuth
- ✅ Type-safe server actions with `useActionState`
- 🎨 Beautiful UI using Tailwind + Radix UI
- 🧠 Schema validation with Zod

---

## 🗂️ Project Structure

```
app/
 ┣ dashboard/        → Status overview + analytics
 ┣ issues/           → Issue list, creation, editing, modals
 ┣ auth/             → NextAuth + session logic
lib/
 ┣ drizzle/          → DB schema & client (Drizzle + PostgreSQL)
 ┣ actions/          → Server actions (create/update/delete)
types/
 ┣ zod-schemas.ts    → Zod form validation
```

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/meghalabs/issue-tracker-nextjs.git
cd issue-tracker-nextjs
npm install

# Apply schema to local PostgreSQL
npm run db:push

# Start development server
npm run dev
```

### 🔐 `.env` Example

```env
DATABASE_URL=postgresql://user:password@localhost:5432/issue-tracker
NEON_DATABASE_URL=postgresql://... # Optional for production
NEXTAUTH_SECRET=your-nextauth-secret
JWT_SECRET=your-jwt-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 💡 Why I Built This

This project gave me a hands-on playground to:

- Use **React Server Components + Server Actions** together
- Build a **modular full-stack system** with **type safety** throughout
- Practice production deployment with **Neon** + **Vercel**
- Explore **Drizzle ORM** for lightweight, SQL-first data access

---

## 🧠 Highlights

- Clean separation of Server ↔ Client using Next.js conventions
- Secure, validated, and accessible forms via `useActionState`, Zod, and Tailwind
- Optimized data-fetching with RSC and Suspense
- Deployed live to Vercel + Neon with dynamic rendering enabled

---

## 📌 Future Enhancements

- 🔍 Issue filtering, sorting, and pagination
- 📈 Analytics via Chart.js or Recharts
- 🔄 Issue history / changelogs
- 🤖 AI summarization (OpenAI SDK)

---

## 👋 Author

Built by [**Megha Gupta**](https://www.linkedin.com/in/megha-gupta-93477b47/)  
Frontend Engineer | Passionate about building clean, fast UIs with a strong backend foundation.

---

> If this repo sparks ideas or questions — feel free to fork, star, or connect!
