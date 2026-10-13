# Sharvari Hupare — 3D Scroll-Driven Portfolio Website

An award-level, scroll-driven 3D portfolio website for **Sharvari Hupare**, Software Development Engineer & Full-Stack AI Engineer. Built with Next.js App Router, React Three Fiber, Drei, Lenis smooth scrolling, and Tailwind CSS.

---

## 🚀 Live Demo & Quick Links
- **Local Dev Server**: `http://localhost:3000`
- **ClinicPilot (Featured Live Project)**: [https://clinicpilot-frontend.vercel.app/](https://clinicpilot-frontend.vercel.app/)
- **GitHub**: [github.com/sharvarihupare-369](https://github.com/sharvarihupare-369)
- **LinkedIn**: [linkedin.com/in/sharvarihupare](https://www.linkedin.com/in/sharvarihupare)

---

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism Design System
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Micro-Interactions**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Architecture

```
portfolio/
├── public/
│   ├── sharvari.jpg              # Profile photograph
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css           # Cosmic dark theme tokens, glassmorphism utilities
│   │   ├── layout.tsx            # Space Grotesk + Inter fonts, SEO metadata
│   │   └── page.tsx              # Single-page journey assembly
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Scene.tsx         # Lazy-loaded WebGL canvas wrapper with fallback
│   │   │   ├── CameraRig.tsx     # Smooth scroll waypoint interpolation & cursor parallax
│   │   │   ├── MorphingCore.tsx  # Refractive glass polyhedron with chromatic core
│   │   │   ├── StarField.tsx     # 1,100+ instanced drifting cosmic particles
│   │   │   └── Lighting.tsx      # Multi-point cyan and violet cinematic lighting
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx # Lenis smooth scroll bridge
│   │   └── ui/
│   │       ├── Navbar.tsx        # Sticky glass navigation with avatar thumbnail
│   │       ├── Preloader.tsx     # Cybernetic loading screen with progress percentage
│   │       ├── HeroSection.tsx   # Glowing portrait, headline, CTAs, metrics
│   │       ├── AboutSection.tsx  # Bento grid: pharmacy-to-tech journey & education
│   │       ├── ExperienceSection.tsx # ImpactGuru & Metta Social timeline cards
│   │       ├── ProjectsSection.tsx   # ClinicPilot, KnowledgeFlow AI, AI Code Converter
│   │       ├── SkillsSection.tsx # Searchable tech matrix & category filters
│   │       ├── ContactSection.tsx# Direct reach-out form & one-click copy toast
│   │       └── Footer.tsx        # Back-to-top button and social links
│   ├── data/
│   │   └── portfolioData.ts      # ⚡ SINGLE SOURCE OF TRUTH FOR ALL RESUME CONTENT
│   ├── hooks/
│   │   └── useScrollJourney.ts   # Synchronizes scroll progress with 3D camera
│   └── types/
│       └── portfolio.ts          # Strictly typed TypeScript data models
└── README.md
```

---

## ✏️ How to Edit Content & Resume Details

All textual content across every section of the website is driven from a single typed file:
👉 **`src/data/portfolioData.ts`**

You do not need to hunt through components to change your information:
1. **Personal Details**: Modify `personal.name`, `personal.tagline`, `personal.location`, `personal.email`, `personal.phone`, etc.
2. **Profile Photo**: Replace `public/sharvari.jpg` or update `avatarUrl` in `portfolioData.ts`.
3. **Experience**: Add or edit roles under the `experiences` array in `portfolioData.ts`.
4. **Projects**: Add live demos, github links, or project highlights in `projects`.
5. **Skills**: Add or organize technical skills under `skillCategories`.
6. **Education**: Update institutions or courses in `education`.

---

## 💻 Running Locally

```bash
# Install dependencies (already installed)
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 🚀 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete 3D scroll-driven portfolio"
   git remote add origin https://github.com/sharvarihupare-369/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Next.js App Router defaults will be automatically detected. Click **Deploy**!
