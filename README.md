# Karan Kumar - Personal Portfolio

A premium, highly interactive portfolio website built using **React**, **TypeScript**, **Vite**, and **GSAP (GreenSock Animation Platform)**. The design utilizes curated aesthetic palettes, clean borders, custom cursor physics, and rich 3D animations.

---

## 🌟 Key Features & Interactivity

This portfolio is packed with interactive motion design details to create a memorable experience:
* 🧲 **Magnetic Navbar Elements**: Logo, navigation links, and theme toggle buttons attract toward the cursor when hovered and spring back elastically using GSAP physics.
* ✨ **Sparkle Mouse Clicks**: Splashes of colorful, randomized four-pointed star particles explode radially from the cursor coordinates on every click, dynamically scaling, rotating, and automatically cleaning up from the DOM.
* 📦 **3D Card Hover Tilts (Interactive Physics)**: Projects and Technical Skills cards rotate dynamically along X and Y axes on hover, casting soft shadow overlays and popping text sections forward on the Z-axis (`translateZ`) for a true 3D parallax feel.
* 📜 **Scroll Trigger Reveals**: Custom scroll reveals trigger slide-ins and staggered card entries on Timeline and Skills grids.
* 🚀 **Cache-Busted Resume Updates**: Resume links append a dynamic time-based query parameter (`?v=timestamp`), preventing browsers from caching outdated files and ensuring your latest resume is downloaded instantly upon updating.
* 🔒 **App-like Protections**: Global right-click context menu prevention and text selection prevention (`user-select: none`) are configured to make the portfolio behave like a native application.

---

## 🛠️ Tech Stack

* **Core**: React 19, TypeScript
* **Styling**: Vanilla CSS Modules (supportive of theme tokens and responsive grids)
* **Animation & Motion**: GSAP (GreenSock), GSAP ScrollTrigger
* **Icons**: React Icons
* **Typing Animation**: React Type Animation
* **Bundler & Server**: Vite 8

---

## 📁 Project Structure

```bash
├── public/
│   ├── google Resume.pdf      # The source PDF download for your resume
│   └── ...
├── src/
│   ├── assets/                # Local image and media assets
│   ├── components/            # Component modules (Hero, Navbar, Projects, Skills, Timeline, Footer, CustomCursor)
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.module.css
│   │   └── ...
│   ├── data/
│   │   └── data.ts            # The CENTRAL file to update all text content & projects
│   ├── App.tsx                # Main container component (manages Theme & Right-click listener)
│   ├── index.css              # Global styles, variables, colors, and selection prevention
│   └── main.tsx               # Application entry point
├── package.json
└── tsconfig.json
```

---

## 🚀 Basic Setup & Local Development

### 1. Clone & Navigate
```bash
git clone https://github.com/karankumar211/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Start the local server with hot module replacement (HMR) enabled:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
Create an optimized production bundle inside the `dist/` directory:
```bash
npm run build
```

### 5. Preview Production Build
Locally serve the compiled `dist/` folder to check performance before deploying:
```bash
npm run preview
```

---

## 🌐 Deployment

This site can be hosted for free on platforms like **Vercel** or **Netlify** with automatic build-on-push configurations:
1. Connect your GitHub repository to your Vercel/Netlify dashboard.
2. Select **Vite** as the framework template.
3. Configure build settings:
   * Build Command: `npm run build`
   * Output Directory: `dist`
4. Click **Deploy**. Any future commits pushed to the `main` branch will automatically trigger redeployments.
