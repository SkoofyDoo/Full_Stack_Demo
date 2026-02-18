# 🚀 Full Stack Demo — CI/CD & Security Setup (Heute)

Dieses Repo zeigt eine moderne **Full-Stack Demo** mit **professionellem Dev-Workflow** (CI/CD + Security).  
Fokus: **Monorepo**, **Quality Gates**, **SAST (CodeQL)** und **saubere Server-Struktur**.

---

## ✅ Was heute umgesetzt wurde

### 🔧 CI/CD mit GitHub Actions

- 🔁 **CI Pipeline** via `.github/workflows/ci.yml`
- ⚙️ Separate Jobs für **Frontend** und **Backend**
- 🧩 **Matrix Builds** für Node.js-Versionen (**20.x** & **22.x**)
- 🚀 Standard-Build-Schritte:
    - `npm ci`
    - `npm run lint --if-present`
    - `npm test --if-present`
    - `npm run build --if-present`

### 🛡️ Security / SAST

- 🛡️ **SAST (Static Application Security Testing)** mit **GitHub CodeQL**
- ✅ CodeQL so angepasst, dass es im **Monorepo** korrekt arbeitet (Frontend & Backend separat)
- 🔐 Ziel: frühes Erkennen von Schwachstellen direkt im CI

### 🔒 Branch Protection & Quality Gates

- 🔒 **Branch Protection Rules** aktiviert
- ✅ Merge in `master` nur möglich, wenn Checks grün sind:
    - `frontend (20.x / 22.x)`
    - `backend (20.x / 22.x)`
    - `SAST (CodeQL)`

### 🧪 Backend Test-Setup (Grundlage)

- ✅ Minimaler Health-Check (`/health`) im Backend
- ✅ Test-Datei vorbereitet: `health.test.js`
- 🎯 Ziel: CI kann echte API-Checks automatisiert ausführen

### 🧱 Saubere Server-Struktur (Best Practice)

- ✅ Express sauber getrennt in:
    - `app.js` → Express-Konfiguration (Routes, Middleware)
    - `server.js` → Startprozess (`listen`)
- 🎯 Vorteil: **besser testbar**, sauberer Aufbau, production-tauglich

---

## 🧩 Tech Stack

- ⚛️ **React + TypeScript** (Vite)
- 🟢 **Node.js + Express** (API)
- 🗄️ **MongoDB / Mongoose** (Backend Persistence)
- 🔁 **GitHub Actions** (CI)
- 🛡️ **CodeQL** (SAST)
- 🔒 **Branch Protection** (Quality Gates)

---

🏁 Ergebnis

Heute wurde das Projekt von „läuft lokal“ auf „professionell abgesichert & CI-ready“ gebracht:

✅ Automatische Builds + Checks

✅ Security Scanning im CI

✅ Merge-Gates über Branch Protection

✅ Struktur + Tests als Basis für echtes Backend-Testing

---

## 📂 Projektstruktur (Monorepo)

```text
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ ci.yml
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config
│   │   ├── 📁 controllers
│   │   ├── 📁 db
│   │   ├── 📁 middleware
│   │   ├── 📁 models
│   │   ├── 📁 routes
│   │   ├── 📁 test
│   │   │   └── 📄 health.test.js
│   │   ├── 📁 utils
│   │   ├── 📄 app.js
│   │   └── 📄 server.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
├── 📁 frontend
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   └── 📄 vite.config.ts
├── ⚙️ .gitignore
├── 📝 README.md
└── ⚙️ package.json
```
