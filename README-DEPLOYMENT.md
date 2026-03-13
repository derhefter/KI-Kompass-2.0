# Deployment-Anleitung: KI-Kompass 3.0

Dieses Dokument beschreibt, wie du deine Änderungen aus dem Branch `feature/landing-page-content` auf GitHub veröffentlichst und damit das Vercel-Deployment triggerst.

## 1. Änderungen auf GitHub pushen
Da ich keinen direkten Zugriff auf deine GitHub-Zugangsdaten habe, musst du diesen Schritt kurz selbst in deinem Terminal ausführen:

```bash
# Gehe in den Projektordner (falls nicht schon dort)
cd /mnt/c/AI/openclaw-workspace/projects/KI-Kompass-2.0

# Überprüfe, auf welchem Branch du bist
git branch

# Pushe den neuen Branch zu GitHub
git push -u origin feature/landing-page-content
```

## 2. Vercel-Deployment
Sobald du den Branch gepusht hast:
1.  Gehe in dein **Vercel-Dashboard**.
2.  Wenn dein Repository mit Vercel verbunden ist, erkennt Vercel automatisch den neuen Branch und startet einen neuen **Preview-Build**.
3.  Vercel zeigt dir nach wenigen Minuten einen Link zur **Preview-URL** an. Diesen Link kannst du nutzen, um deine neue Landing Page live zu sehen.

## 3. Deployment auf die Hauptseite (Produktion)
Wenn dir die Preview-Version gefällt:
1.  Erstelle auf GitHub einen **Pull Request** von `feature/landing-page-content` nach `main`.
2.  Merge den Pull Request.
3.  Vercel wird automatisch die Live-Seite (Produktion) mit den neuen Inhalten aktualisieren.
