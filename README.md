# Issue Tracker Next.js App

This is a modern issue tracker application built with [Next.js](https://nextjs.org), leveraging the App Router, TypeScript, Drizzle ORM, and Tailwind CSS. The project demonstrates best practices for building scalable, full-stack web applications with Next.js 13+.

## Features

- 📝 Create, update, and manage issues
- 🔒 Authentication & authorization
- 📊 Dashboard with filtering and sorting
- 🗂️ API routes using the App Router
- 🧩 Modular components and layouts
- 🌐 Middleware for security and customization
- 🎨 Styled with Tailwind CSS
- 🧪 Unit and integration tests with Vitest
- 🚀 Ready for deployment on Vercel

## Getting Started


### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in the required values (e.g., database connection string, secrets).

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 4. Running Tests

```bash
npm test
```

## Project Structure

- `app/` – Main application code (routes, components, layouts)
- `app/api/` – API routes (App Router)
- `db/` – Database schema and Drizzle ORM config
- `lib/` – Utilities and shared logic
- `public/` – Static assets
- `scripts/` – Setup and migration scripts

## Deployment

Deploy easily to [Vercel](https://vercel.com/) for production hosting.

1. Push your repository to GitHub.
2. Import your project into Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy!

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

---

Made with ❤️ using Next.js.