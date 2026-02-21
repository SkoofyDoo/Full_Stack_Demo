# Security Policy

Dieses Repository ist eine Full-Stack-Demo mit Fokus auf sichere CI/CD-Pipeline (DevSecOps-Basics).

## Supported Versions
- Aktuell wird nur der Branch `master` behandelt.

## Reporting von Sicherheitsproblemen
Bitte erstelle ein GitHub Issue mit dem Label **security** und beschreibe:
- betroffene Komponente (frontend/backend/CI)
- Reproduktionsschritte
- erwartetes vs. tatsächliches Verhalten
- falls möglich: Hinweis auf CVE/GHSA/OSV-ID

> Hinweis: In dieser Demo werden keine Produktions-Secrets gespeichert. Trotzdem werden Secrets-Leaks im CI aktiv blockiert.

## Security Gates im CI
Folgende Checks müssen für einen Merge nach `master` grün sein:
- Build & Tests (Node 20/22)
- Dependency Review (nur PR)
- Secret Scanning (Gitleaks)
- SAST (CodeQL, security-extended)
- SBOM (CycloneDX) + SCA (OSV)

## Baseline-Regel (No New HIGH/CRITICAL)
Wir akzeptieren, dass ein Projekt initial technische Security-Schulden haben kann.
Daher gilt:

**Pull Requests dürfen keine neuen HIGH/CRITICAL Vulnerabilities einführen.**

Um das kontrollierbar zu machen, wird ein Baseline-File gepflegt:
- `security/osv-baseline.txt`

CI-Regel:
- OSV scannt das Projekt (über SBOM)
- HIGH/CRITICAL Findings werden extrahiert
- Wenn neue IDs erscheinen, die nicht im Baseline stehen → PR schlägt fehl

## SLA / Priorisierung (für Demo-Disziplin)
- CRITICAL: sofort / spätestens 24–48h
- HIGH: 3–7 Tage
- MEDIUM: 2–4 Wochen
- LOW: Best effort

## Hinweise zur Supply Chain Security
- GitHub Actions sind per **SHA pinning** fixiert (immutable builds).
- Abhängigkeiten werden per Dependabot aktualisiert.
- Neue Dependencies werden bei PRs über Dependency Review geprüft.