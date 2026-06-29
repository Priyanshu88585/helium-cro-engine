# Helium AI Shopify CRO Opportunity Engine

This is a production-grade AI-powered SaaS application built for the Helium Engineering Assessment. It accepts a Shopify store URL, crawls the website, extracts content, and performs a comprehensive Conversion Rate Optimization (CRO) analysis using structured AI outputs.

## 🚀 Features

- **Automated Web Crawling**: Intelligently extracts text content from Shopify stores (with Firecrawl or Cheerio fallback).
- **AI-Powered Analysis**: Uses OpenAI (GPT-4o) with strict Zod schemas to guarantee structured, hallucination-free JSON outputs.
- **Prioritization Engine**: Calculates an internal priority score based on Expected Lift, Confidence, and Implementation Effort.
- **Premium Executive Dashboard**: Beautifully visualizes the overall health score, estimated revenue uplift, and actionable opportunities using a modern Glassmorphic design system.
- **Interactive Revenue Estimator**: Allows users to tweak visitors, conversion rate, and AOV to see the projected monthly uplift in real-time.
- **Experiment Generator**: One-click generation of professional A/B test briefs complete with hypotheses, metrics, and implementation steps.
- **PDF Export**: Print-optimized CSS allows exporting the dashboard directly to a beautifully formatted PDF.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **Database**: Prisma ORM with local SQLite (easily swappable to PostgreSQL)
- **AI**: OpenAI SDK with Structured Outputs (`zodResponseFormat`)
- **Authentication**: NextAuth.js (Auth.js v5) ready

## 📦 Getting Started

### 1. Clone & Install
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create a \`.env\` file in the root and add:
\`\`\`env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
# Optional:
FIRECRAWL_API_KEY="fc-..."
\`\`\`

### 3. Database Setup
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit \`http://localhost:3000\` to access the application.

## 🏗️ Architecture

- \`app/\`: Next.js App Router (Landing page, Dashboard).
- \`actions/\`: Server Actions (\`analyze.ts\`, \`experiment.ts\`) for secure backend execution.
- \`ai/\`: OpenAI integration pipelines and strict Zod schema definitions.
- \`crawler/\`: Web crawling logic with Firecrawl integration and Cheerio fallback.
- \`features/\`: Domain-specific React components (Revenue Estimator, Opportunity Cards).
- \`prisma/\`: Database schema and configuration.

## 🛡️ Security & Performance
- Uses Next.js Server Actions to keep API keys completely hidden from the client.
- Data structures are strongly typed end-to-end with Prisma, Zod, and TypeScript.
- The crawler truncates extremely large payloads before sending them to the LLM to manage token usage safely.

## 🎨 Design Philosophy
The UI follows principles from Linear, Vercel, and Stripe. It employs dark mode by default, glassmorphism (`backdrop-blur`), subtle `framer-motion` animations on entry, and accessible semantic HTML components via `shadcn/ui`.

---
*Built for the Helium Assignment.*
