
# 🧠 Mental Models & Architecture Guide for Next.js, RSC, Vercel, and Related Concepts

This guide captures a structured mental map of modern full-stack app development using Next.js (App Router), React Server Components, Vercel Serverless architecture, and related patterns.

---

## 1. 🔄 React Server Components (RSC)

**What**: Components rendered on the server. No client-side JS bundle unless explicitly needed.

**Where**: All files like `page.tsx`, `layout.tsx` are Server Components by default.

**How they work**:
- Run on server → render HTML → sent to client
- Can be `async` to fetch data directly
- Don't include client-side interactivity

**Use case**: Ideal for rendering data-heavy pages with no interactivity.

---

## 2. ⚙️ Server Actions

**What**: Server-side functions triggered via form submissions or imperative calls.

**Syntax**:
```ts
'use server';
export async function createIssue(formData: FormData) { ... }
```

**Use case**: Mutating data securely with automatic type safety and no client JS needed.

**Works in**:
- RSC via `form action={fn}`
- Also callable via `useTransition` in client

---

## 3. 🧠 Client Components

**What**: Components using `'use client'` that run fully in the browser.

**Can**:
- Use `useState`, `useEffect`
- Interact with DOM
- Call API Routes via `fetch`

**Cannot**:
- Access server-side secrets
- Use server actions directly (without wrappers)

---

## 4. ☁️ Serverless Functions (Vercel)

**Where it fits**:
- Every RSC, API route, or server action → runs as **a serverless function**
- Triggered on request
- Stateless, fast-starting

**Edge vs Serverless**:
```ts
export const runtime = 'edge'; // optional, runs closer to user
```

---

## 5. 🔗 API Routes

**What**: REST-style endpoints inside `/app/api/route.ts`.

**Use case**: Fetch from client or serve data to external systems.

**Key Points**:
- Each route = Serverless function
- Can handle methods (GET/POST)
- Used for things like file uploads, auth, or 3rd party integrations

---

## 6. 🪝 Webhooks

**What**: HTTP callbacks triggered by external services (e.g., Stripe, GitHub)

**Handled via**: API Routes
```ts
// POST /api/webhooks/stripe
export async function POST(req: Request) { ... }
```

**Use case**: Stripe payment events, GitHub commits, Vercel deploy hooks, etc.

---

## 7. 🗂 Data Access Layer (DAL)

**Where**:
- Usually in `lib/db.ts` or `lib/drizzle/schema.ts`
- Use Drizzle/Prisma/etc

**Used by**:
- Server Actions
- API Routes
- RSC pages

**Best Practices**:
- Keep DAL stateless & type-safe
- Wrap queries in reusable helpers

---

## 8. 🌀 Suspense

**What**: Enables deferred loading of server or client components.

**Syntax**:
```tsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

**Used with**:
- Lazy client components
- Streaming RSC with partial hydration

---

## 9. 📄 `page.tsx` Files

- Always RSC by default
- You can use `async` to fetch directly from DB
- Wrap parts in `<Suspense>` if needed
- Use client components for interactivity (like buttons/forms)

---

## 🧠 TL;DR Visual Map

```plaintext
[Client Component]
  └── fetch() ──► [API Route (Serverless)]
                          └── DB / External API

[Server Component (page.tsx)]
  └── async/await ──► DB directly

<form action={ServerAction}>
  └── [Serverless Function handles mutation]

[Webhook]
  ◄── POST from Stripe → /api/webhooks/stripe
```

---




---

## 11. 🌐 Domains, DNS, Proxies & Serverless Compute

### 🔸 Domains

**What**: Human-readable names like `meghalabs.dev` that map to your deployed app.

**In Vercel**:
- Easily manage custom domains via the dashboard
- SSL is auto-configured (HTTPS)
- Preview deployments get unique subdomains

---

### 🔸 DNS (Domain Name System)

**What**: Translates domain names to IP addresses to locate your site on the internet.

**In Vercel**:
- Vercel can host DNS or connect to external providers
- Supports A, CNAME, TXT, etc. records
- Example: `CNAME www ➝ cname.vercel-dns.com`

---

### 🔸 Proxies

**What**: Intermediaries that intercept requests and responses.

**In Vercel**:
- Middleware behaves like a reverse proxy
- Used for auth, locale redirects, A/B testing

**Example**:
```ts
// middleware.ts
if (!auth) return NextResponse.redirect("/login")
```

---

### 🔸 Serverless Compute

**What**: Executes your backend logic without provisioning or managing servers.

**In Vercel**:
- API Routes, Server Actions, RSCs = Serverless or Edge
- Auto-scaling, per-invocation billing

**Types**:
| Type          | Runtime     | Location        | Use Cases                |
|---------------|-------------|------------------|---------------------------|
| Serverless    | `nodejs`    | Centralized DCs  | DB calls, API routes     |
| Edge Function | `edge`      | Global POPs      | Auth, geolocation, SSR   |

---

### 🧠 Where These Fit Architecturally

```plaintext
USER REQUEST
    ↓
🌍 Domain (meghalabs.dev)
    ↓
📘 DNS resolves to Vercel Edge Network
    ↓
🔁 Middleware.ts (Edge Function Proxy)
    ↓
📄 RSC / Route.tsx / API / Server Actions
    ↓
📦 Serverless Function (Node.js runtime)
    ↓
🗃️ DB, Edge Config, External API
```




