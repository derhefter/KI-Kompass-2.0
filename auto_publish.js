const fs = require('fs');
const { execSync } = require('child_process');

const mdBlog = fs.readFileSync('/home/steff/.openclaw/shared/pipeline/content-output/draft-task-20260422-001.md', 'utf8');
const mdLinkedIn = fs.readFileSync('/home/steff/.openclaw/shared/pipeline/content-output/linkedin-task-20260422-001.md', 'utf8');

// Parse Markdown for Blog
const titleMatch = mdBlog.match(/^# (.+)/);
const title = titleMatch ? titleMatch[1] : "KI-Revolution im deutschen Mittelstand 2026";
const excerpt = "Über 41 % der mittelständischen Unternehmen nutzen KI aktiv – nicht nur als Chatbot, sondern als echte Prozesslösung. Erfahre, wo die wahren Hebel liegen.";

// Very basic MD to HTML conversion for this specific structure
let htmlContent = mdBlog
    .replace(/^# .+\n/, '')
    .replace(/^## (.+)/gm, '<h2>$1</h2>')
    .replace(/^### (.+)/gm, '<h3>$1</h3>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/^\* (.+)/gm, '<li>$1</li>')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/(<li>.+<\/li>)/s, '<ul>$1</ul>')
    .replace(/---/g, '<hr>')
    .replace(/\n\n/g, '<br><br>');

const postJson = { title, excerpt, html_content: htmlContent };
fs.writeFileSync('/home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0/new_post.json', JSON.stringify(postJson, null, 2));

console.log("Publishing Blog Post...");
execSync('bash /home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0/publish.sh new_post.json', {stdio: 'inherit'});

// Parse LinkedIn text
let liText = mdLinkedIn.split('## Post-Text')[1].trim();

// Add delay
console.log("Warte 60 Sekunden für Vercel Build (OG Image Generierung)...");
setTimeout(() => {
    const slug = fs.readFileSync('/home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0/last_slug.txt', 'utf8').trim();
    const articleUrl = `https://derhefter.com/blog/${slug}`;
    console.log(`Publishing to LinkedIn mit Artikel-URL: ${articleUrl}`);
    
    // Call linkedin.js
    try {
        execSync(`node /home/steff/.openclaw/workspace/Projekte/ki-news-radar/linkedin/linkedin.js "${liText.replace(/"/g, '\\"')}" "${articleUrl}"`, {stdio: 'inherit'});
        console.log("LinkedIn Publish Script abgeschlossen!");
    } catch(e) {
        console.error("Fehler beim LinkedIn Script:", e.message);
    }
}, 60000);
