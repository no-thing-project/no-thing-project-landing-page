= No.Thing Project - Web Application
:toc:
:toc-title: Table of Contents
:sectnums:

_A modern, scalable React web application with support for multiple environments (Development, Staging, Production) and advanced animations._

== 📌 Project Overview
This is a **React-based** web application designed for the **No.Thing Project**.  
The project features:
- ✅ **Dynamic routing** with `react-router-dom`
- ✅ **Smooth animations** powered by `framer-motion`
- ✅ **Three.js HDR textures** for enhanced 3D experiences
- ✅ **Custom Cursor** for an immersive UX
- ✅ **Multi-environment support** (Dev, Staging, Production)
- ✅ **Optimized structure with modular components**
- ✅ **GitHub Pages Deployment** for easy hosting

== 🚀 Project Setup

=== Install Dependencies
```bash
npm install
```

=== Set Up Environment Variables
Create the following environment files in the project root:

==== 📌p `.env.development`
```
APP_ENV=development
API_URL=https://dev.api.mysite.com
PUBLIC_URL=/dev
APP_GA_ID=UA-XXXXX-Y
```

== 🔥 Running the Project

=== Start in Development Mode
```bash
npm run start:development
```

== 🏠 Building for Deployment

=== Build for Development
```bash
npm run build:development
```

=== Serve Production Build Locally
```bash
npm run serve
```

== 📄 Deploying to GitHub Pages
1. **Pre-deployment (Build Production)**
```bash
npm run predeploy
```
1. **Deploy to GitHub Pages**
```bash
npm run deploy
```

== 🌿 Project Structure
```bash
src/
├── components/
│   ├── CustomCursor/
│   │   └── CustomCursor.jsx
│   ├── LandingPage/
│   │   └── LandingPage.jsx
│   ├── Sections/
│   │   ├── HeroSection.jsx
│   │   ├── WhatIsSection.jsx
│   │   ├── NothingSection.jsx
│   │   ├── InterestingSection.jsx
│   │   ├── ContactSection.jsx
│   ├── Layouts/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   ├── SplashScreen/
│   │   ├── CodeSplashScreen.jsx
│   │   ├── SplashScreenContainer.jsx
│   ├── Scene/
│   │   ├── Scene3D.jsx
├── containers/
│   ├── SplashScreenContainer.jsx
│   ├── LandingPageContainer.jsx
├── config/
│   └── config.js
├── assets/
│   ├── animations/
│   ├── hdr_maps/
├── App.jsx
├── index.js
├── package.json
├── .env.development
├── .env.staging
├── .env.production
```


== 🛠 Troubleshooting
```bash
rm -rf node_modules/.cache && npm start
npm install
npm run clean
```

== 🚀 Contributing
Fork, clone, install dependencies, create a new branch, commit, and open a PR.

== 🔧 Tech Stack
| Technology | Purpose |
|------------|---------|
| **React.js** | UI Components |
| **Framer Motion** | Animations |
| **Three.js** | 3D Scenes |
| **React Router** | Routing |
| **GH-Pages** | Deployment |
| **Cross-Env** | Environment Handling |
| **Serve** | Local Production Server |

== 🌟 Credits & Thanks
Built with ❤️ by the **No.Thing Project** team.  
Follow us:
- 🌐 https://nothingproject.io[Website]
- 🐦 https://twitter.com/nooneonnothing[Twitter]
- 📸 https://instagram.com/no.thing.project[Instagram]
- 📚 https://linkedin.com/company/no-thing-project[LinkedIn]

== 📚 License
MIT License © No.Thing Project 2024.

🚀 **Now you're ready to contribute, build, and deploy the No.Thing Project web application!**