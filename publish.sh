#!/bin/bash
DIR="/home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0"
cd $DIR
node add_post.js "$1"
git config user.email "steffenhefter@googlemail.com"
git config user.name "Steffen"
git add src/data/blog-posts.js
git commit -m "Auto-Publish: Neuer KI-Radar Artikel"
git push origin main
echo "Upload an GitHub (Vercel) war erfolgreich!"
