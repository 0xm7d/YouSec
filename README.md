# YouSec — YouCode Cybersecurity Club Website & Membership Platform

![YouSec Logo](/public/yousec-logo.jpg)

Official membership application website for **YouSec**, the Cybersecurity & Ethical Hacking Club at **YouCode Safi, Morocco**.

Inspired by modern community design, built with a dark-first cybersecurity visual identity (#090909 background, #DC2626 crimson red accent, #F5F5F5 text), polished typography (Inter, Space Grotesk, JetBrains Mono), and an intuitive 4-step membership application process.

---

## 🌟 Key Features

1. **Official Branding & Identity:**
   - Official YouSec circular emblem badge.
   - Institutional identification (`YOUCODE SAFI • MOROCCO`).
   - Club motto: *"Learn Freely. Hack Ethically. Respect Everyone."*
   - Cyber ambient grid background with subtle crimson glow and terminal coordinate markers (`+`).

2. **Core Exploration Sections:**
   - **Hero Section:** Strong typography, clear value proposition, quick signals (Ethics First, All Skill Levels, 8 Technical Tracks).
   - **01 — Why YouSec (4 Core Pillars):** Learn, Practice, Collaborate, Compete.
   - **02 — Technical Domains:** Linux & Networking, Web Security, Cryptography, Digital Forensics, Reverse Engineering, Binary Exploitation (Pwn), CTF Competitions, Defensive Security.
   - **03 — Ethics & Values:** Inclusivity (welcomes beginners to advanced), responsible disclosure, and community accountability.

3. **Multi-Step Membership Application Form:**
   - **Step 1 — Personal Information:** Full name, email address, campus (Safi / Youssoufia), academic year / track, discord username.
   - **Step 2 — Cybersecurity Background:** Experience level (Complete Beginner, Beginner, Intermediate, Advanced), areas of interest multi-selector, prior lab/CTF participation toggle and details.
   - **Step 3 — Motivation & Mindset:** Long-form responses with real-time character counters and minimum thresholds.
   - **Step 4 — Review & Consent:** Full dossier review card with instant section editing, and 3 mandatory ethical checkboxes (Code of Conduct, Authorized Security Pledge, Data Processing Notice).

4. **Dedicated Requirements Implemented:**
   - **Single Submission Constraint:** Each applicant email address is restricted to exactly **one submission** (enforced both via frontend validation and database-level `UNIQUE (email)` constraint).
   - **Dossier Export (.DOC / Word):** Applicants and club managers can instantly download a formatted Microsoft Word-compatible dossier (`.doc`) containing the complete application answers and metadata.
   - **Email Notification to `mohamedbriti01@gmail.com`:** Integrated delivery via EmailJS / Webhook to alert the club coordinator for each incoming candidate.
   - **Autosave & Draft Persistence:** Seamless browser storage saves user progress in real-time with an autosave badge and reset option.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Celebration:** Canvas-Confetti
- **Database Backend:** Supabase (PostgreSQL with Row Level Security)
- **Notification Services:** EmailJS / Webhook integration

---

## 🚀 Quick Start (Local Development)

### 1. Clone or Open Workspace
```bash
cd "c:\Users\Underrated\OneDrive\Bureau\hiba"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your credentials in `.env`:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# EmailJS Configuration (Destination: mohamedbriti01@gmail.com)
VITE_EMAILJS_SERVICE_ID=service_yousec
VITE_EMAILJS_TEMPLATE_ID=template_yousec_app
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
*(Note: If environment variables are omitted during local preview, the app runs in full offline demo mode with local storage persistence and Word doc generation).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🗄️ Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository and run the script.
4. This creates:
   - `applications` table with `email TEXT UNIQUE NOT NULL`.
   - Indexes for fast searches.
   - Row Level Security (RLS) policies allowing anonymous applicants to submit (`INSERT`) while strictly preventing public viewing (`SELECT`) of other candidates' sensitive data.

---

## 🌐 Deployment to Vercel

1. Push your project to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build` (or `tsc -b && vite build`).
5. Output Directory: `dist`.
6. Add your Environment Variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
7. Click **Deploy**. Your site will be live on Vercel with high performance and global CDN edge caching.

---

## 📜 Club Governance

- **Motto:** *"Learn Freely. Hack Ethically. Respect Everyone."*
- **Institution:** YouCode Safi, Morocco
- **Contact & Applications Reviewer:** `mohamedbriti01@gmail.com`
