# Portfolio development rules

## Project and design

- Build a personal portfolio for **Nida Maryam**, aimed at recruiters and clients.
- Follow the existing **Instagram profile–inspired design plan**. Do not invent a competing visual direction; request the relevant design reference when implementation needs it.
- Present these confirmed service areas: Social Media Management; Content Planning & Creative Direction; Website Content Writing; Mobile Videography & Video Editing; Marketing Campaigns; Administration & HR Coordination.
- Use only supplied or approved personal content. Never invent experience, achievements, skills, projects, testimonials, metrics, or contact details. Do not ship placeholders as real portfolio content.
- Use Helvetica for body text, with `Arial, sans-serif` fallbacks. Prefer the locally available font; do not bundle unlicensed Helvetica font files.
- Page structure, colors, heading typography, theme behavior, and detailed interactions remain open until supplied or agreed. Ask only when a missing decision materially affects the current task.

## Stack and architecture

- Use Next.js App Router, React, strict TypeScript, Tailwind CSS, GSAP, and Motion. Use pnpm for package management and target Vercel deployment.
- Keep the portfolio frontend-only and static-first. Generate pages at build time wherever possible; do not add a backend, database, API routes, Server Actions, or request-time application logic.
- Prefer Server Components. Keep Client Components limited to interactions, animations, and browser APIs; avoid turning whole pages into client components unnecessarily.
- Keep routes and metadata in `src/app`. Place shared UI in `src/components`, reusable content/data in `src/lib` when needed, and local assets in `public`. Use the existing `@/*` alias for `src/*` imports.
- Use typed data for repeated services or projects. Keep components focused, reuse existing patterns, and avoid speculative abstractions, unnecessary state, effects, and dependencies.
- Use Tailwind utilities and shared theme tokens for recurring colors, typography, and spacing. Reserve custom CSS for behavior or styling that utilities do not express clearly.
- Follow existing naming conventions and Biome configuration. Do not replace tooling or change project configuration without a task-related need.

## Animation and interaction

- Use Motion for component transitions and interaction feedback; use GSAP for coordinated timelines and scroll-driven sequences when needed. Do not let both control the same animated properties on the same element.
- Every animation must serve a purpose. Keep effects lightweight, respect `prefers-reduced-motion`, and clean up timelines, triggers, listeners, and subscriptions.
- Prefer transform and opacity animations. Keep content readable without animation; avoid scroll hijacking, blocking preloaders, and decorative effects that hurt performance or usability.

## Accessibility, SEO, and performance

- Support mobile, tablet, laptop, and desktop layouts with semantic HTML, logical headings, visible focus, sufficient contrast, descriptive alt text, and keyboard-accessible controls.
- Instagram-inspired UI must retain clear portfolio navigation and accessible behavior. Any dialogs need focus management, Escape dismissal, and focus restoration; hover must not be the only way to access content.
- Provide page-specific metadata, Open Graph/social previews, sitemap, and robots directives. Use the confirmed production URL for canonical links and only factual, relevant JSON-LD.
- Use Next.js image and font optimization where suitable. Supply image dimensions, responsive sizes, and modern assets; lazy-load noncritical media and avoid unnecessary video downloads or autoplay with sound.
- Minimize client JavaScript and layout shifts. Split heavy interactive features when justified, protect Core Web Vitals, and never sacrifice accessibility or SEO for decoration.

## Workflow and definition of done

- For substantive tasks, start with a rough completion estimate. Give concise milestone updates approximately every 2–3 minutes or at major milestones: **~X% done · ~Y–Z min remaining · Current step**. Mention blockers and report 100% only after requested work and checks are complete.
- Inspect existing behavior and relevant installed Next.js documentation before implementation. Preserve unrelated user changes and the generated guidance below.
- Do not install packages or modify configuration merely to prepare documentation. During implementation, add only dependencies required by the authorized task; avoid unnecessary environment variables, serverless functions, and deployment configuration.
- For code changes, run `pnpm lint` and `pnpm build`, plus focused checks appropriate to the behavior changed. Verify affected responsive layouts, keyboard use, and reduced-motion behavior when relevant. Documentation-only changes require a diff review, not an application build.
- A task is done when the requested behavior matches the supplied design/content, relevant checks pass, and no unintended changes or production placeholders remain. Report material changes, verification, and unresolved limitations. Commit or push only when requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
