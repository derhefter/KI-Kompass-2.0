const fs = require('fs');
const { execSync } = require('child_process');

const mdBlog = fs.readFileSync('/home/steff/.openclaw/shared/pipeline/content-output/published-task-20260428-news.md', 'utf8');

const titleMatch = mdBlog.match(/^# (.+)/);
const title = titleMatch ? titleMatch[1] : "KI-News-Radar: Automatisierung im Mittelstand 2026";
const excerpt = "Von der Spielerei zum Kernprozess: So wird KI 2026 im Mittelstand produktiv. Erfahren Sie, warum Hyperautomatisierung das neue Normal ist.";

let htmlContent = mdBlog
    .replace(/^# .+\n/, '')
    .replace(/^## (.+)/gm, '<h2>$1</h2>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/👉 /g, '👉 ');

htmlContent = '<p>' + htmlContent + '</p>';
// clean up some tags
htmlContent = htmlContent.replace(/<p><h2>/g, '<h2>').replace(/<\/h2><\/p>/g, '</h2>');

const postJson = { title, excerpt, html_content: htmlContent };
fs.writeFileSync('/home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0/new_post_28.json', JSON.stringify(postJson, null, 2));

console.log("Publishing Blog Post...");
execSync('bash /home/steff/.openclaw/workspace/Projekte/KI-Kompass-2.0/publish.sh new_post_28.json', {stdio: 'inherit'});
