# 🚀 Full Stack Demo — CI/CD & Security Setup

Dieses Repo zeigt eine moderne **Full-Stack Demo** mit **professionellem Dev-Workflow** (CI/CD + Security).  
Fokus: **Monorepo**, **Quality Gates**, **SAST (CodeQL)** und **saubere Server-Struktur**.

# **TAG 3:**


## ✅ Was heute umgesetzt wurde

### Schritt 1: Dependency Review für Pull-Request

**GitHub Dependency Review Action** wurde in CI integriert

Diese läuft ausschließlich bei Pull Request und überprüft:
        - welche neuen Abhängigkeiten hinzugefügt werden
        - welche Versionen betroffen sind
        - ob bekannte Sicherheitslücken (CVEs) vorhanden sind
        - ob eine hohe oder kritische Severity enthalten ist

**Warum ist das wichtig?**

Viele Sicherheitsprobleme entstehen nicht durch eigenen Code, sondern durch neue Libraries.

### Schritt 2: Secret Scanning (Gitleaks)

API_KEYS | AWS_KEYS | TOKENS | PASSWÖRTER | PRIVATE_KEYS

Secrets in Repo sind einer der häufigsten Sicherheitsvorfälle.  

### Schritt 3: SHA Pinning 

Alle GitHub Actions wurden von 
´´´
uses: actions/checkout@v4 
´´´
zu
´´´
uses: actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5
´´´
umgestellt. 

Dieser Vorgang dient dem Abwehr von Supply Chain Angriffen. 

Mit SHA-Pinning wird kein automatischen Update ohne Kontrolle durchgeführt und man hat reproduzierbare Builds.

## FAZIZ ##

Die Pipeline enthält nun mehrere Security-Layer:

🧪 Build & Tests

🛡️ CodeQL (SAST)

📦 SBOM + OSV Scan

🔎 Dependency Review

🔐 Secret Scanning

🔒 SHA Pinning

🚦 Branch Protection Rules

Das bedeutet:

Kein Merge bei kritischen Dependency-Problemen

Kein Merge bei geleakten Secrets

Kein Merge bei SAST Findings

Keine unsicheren GitHub Actions durch Supply Chain Drift


--- 

# **TAG 2:**

## ✅ Was heute umgesetzt wurde

### Schritt 1: Dependabot Troubleshooting

Der Tag beginnt mit Dependecies Security issue. Gute Neuigkeit Dependabot funktioniert! 

Fehler: 
**minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern. SEVERITY: 7.5 / 10 (HIGH)**
´´´ 
    jest@30.2.0 requires minimatch@^9.0.4 via a transitive dependency on glob@10.5.0
    nodemon@3.1.11 requires minimatch@^3.1.2
    jest@30.2.0 requires minimatch@^3.0.4 via a transitive dependency on test-exclude@6.0.0
    jest@30.2.0 requires minimatch@^3.1.1 via a transitive dependency on glob@7.2.3
    No patched version available for minimatch
´´´ 
Jest und Nodemon haben verschieden Minimatch Versionen, die Dependabot nicht updaten kann. 

#### Was ist überhaupt ReDoS (Regular Expression Denial of Service)

Mehr darüber: https://github.com/advisories/GHSA-f8q6-p94x-37v3

Ich habe gleich versucht es zu Fixen:

Als erstes installierte ist die Versionen der Jest und Nodemon Bibliotheken neu. 
´´´ 
    npm view jest version | npm view nodemon version
    npm i -D jest@^<< version >> | npm i -D nodemon@^<< version >>

´´´

Danach löschte ich die Node Module und package-lock.json und installiere alle Pakete neu
´´´ 
    rm -rf node_modules package-lock.json
    npm install
    
´´´
Leider hatte ich keinen Efolg. Nach der recherche stellte sich raus, dass diese Schwachstelle  ausschließlich Entwicklungsabhängigkeiten betrifft und keinen Einfluss auf die Produktionslaufzeit hat. 

Das Verhalten ist bekannt und dokumentiert. 

### Schritt 2: Anpassungen von OSV in ci.yml 
**ajv has ReDoS when using $data option. Severity 5.5 (MEDIUM)**

Mehr dazu: **https://osv.dev/vulnerability/GHSA-2g4f-4pwh-qvx6**

OSV scannt Abhängigkeits-Lockfiles und nicht die tatsächlich installierten Module.

Durch eine Internetrecherche und Diskussionen mit KI bin ich auf folgenden Sicherheitsstandart für CI/CD gestoßen. 

**CycloneDX SBOM (Software Bill of Materials)** - eine maschinenlesbare Liste aller Abhängigkeiten einer Anwendung:
    - welche Pakete verwendet werden
    - welche Versionen im Einsatz sind
    - wie die Anhängigkeiten miteinanderverknüpft sind

SBOM gilt als Industriestandart und ist ein Teil moderner Sicherheitsanforderungen. 

Mehr dazu: [CycloneDX](https://cyclonedx.org/)

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
