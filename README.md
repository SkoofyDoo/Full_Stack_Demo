# 🚀 Full Stack Demo — CI/CD & Security Setup

Dieses Repo zeigt eine moderne **Full-Stack Demo** mit **professionellem Dev-Workflow** (CI/CD + Security).  
Fokus: **Monorepo**, **Quality Gates**, **SAST (CodeQL)** und **saubere Server-Struktur**.

---

# **TAG 1:**

## ✅ Was heute umgesetzt wurde

### Schritt 1: Projektstruktur

Für die Umsetzung dieses Demo-Projekts erstellte ich einen Ordner mit Projektnamen und zwei Unterordnern ('frontend/backend').

Für das Frontend Build nutze ich **Vite** und richte es für React/TypeScript ein.

Fürs Backend installiere ich Express, Cors, dotenv usw.

## 📂 Ergebnis (Monorepo)

```
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

### Schritt 2: Backend und Tests

- ✅ Express sauber getrennt in:
    - `app.js` → Express-Konfiguration (Routes, Middleware)
    - `server.js` → Startprozess (`listen`)
- 🎯 Vorteil: **besser testbar**, sauberer Aufbau, production-tauglich

Minimaler Health-Check (`/health`) im Backend
Test-Datei vorbereitet: `health.test.js`
**Ziel**: CI kann echte API-Checks automatisiert ausführen

### Schritt 3: CI/CD mit GitHub Actions

**CI Pipeline** via `.github/workflows/ci.yml`
Separate Jobs für **Frontend** und **Backend**
**Matrix Builds** für Node.js-Versionen (**20.x** & **22.x**)

### Schritt 4: Security / SAST

🛡️ **SAST (Static Application Security Testing)** mit **GitHub CodeQL**

- ✅ CodeQL so angepasst, dass es im **Monorepo** korrekt arbeitet (Frontend & Backend separat)
- 🔐 Ziel: frühes Erkennen von Schwachstellen direkt im CI

### Schritt 5: Branch Protection & Quality Gates

🔒 **Branch Protection Rules** aktiviert

- ✅ Merge in `master` nur möglich, wenn Checks grün sind:
    - `frontend (20.x / 22.x)`
    - `backend (20.x / 22.x)`
    - `SAST (CodeQL)`

## 🧩 Tech Stack

- ⚛️ **React + TypeScript** (Vite)
- 🟢 **Node.js + Express** (API)
- 🔁 **GitHub Actions** (CI)
- 🛡️ **CodeQL** (SAST)
- 🔒 **Branch Protection** (Quality Gates)

---

### Ergebnis

Ein gutes Ergebnis für den ersten Tag.
Ich habe nicht nur die Grundstruktur des Projekts hinterlegt sondern auch die ersten Schritte der sicheren CI/CD implementiert. Dabei habe ich neue Technologien kennengelernt und umgesetzt, z.B CodeQL, Dependabot für Dependencies-Check und OSV. Ebenfalls habe ich neue Rulesets in GitHub Settings erstellt. Diese Branch-Protection-Regeln dienen der Qualitätkontrolle, Sicherheit und eigener Disziplin.

---
