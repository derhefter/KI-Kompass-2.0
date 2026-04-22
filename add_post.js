const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'blog-posts.js');
let content = fs.readFileSync(filePath, 'utf8');

// Parse args or read from a JSON file to handle large HTML blocks
const argsFile = process.argv[2];
if (!argsFile || !fs.existsSync(argsFile)) {
    console.error("Bitte JSON-Datei mit den Post-Daten (title, excerpt, html_content) übergeben.");
    process.exit(1);
}

const postData = JSON.parse(fs.readFileSync(argsFile, 'utf8'));

// Find max ID
let maxId = 0;
const idMatches = content.match(/id:\s*(\d+),/g);
if (idMatches) {
    idMatches.forEach(m => {
        const num = parseInt(m.replace(/\D/g, ''));
        if (num > maxId) maxId = num;
    });
}
const newId = maxId + 1;

// Create slug
const slug = postData.title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const today = new Date().toISOString().split('T')[0];

const newPostBlock = `  {
    id: ${newId},
    slug: '${slug}',
    title: '${postData.title.replace(/'/g, "\\'")}',
    excerpt: '${postData.excerpt.replace(/'/g, "\\'")}',
    content: \`
${postData.html_content.trim()}
\`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '${today}',
    status: 'published',
    image: '',
    readTime: 3
  },
`;

// Insert after export const blogPosts = [
content = content.replace("export const blogPosts = [", "export const blogPosts = [\n" + newPostBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Artikel erfolgreich eingefügt: " + slug);
