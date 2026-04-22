const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'blog-posts.js');
let content = fs.readFileSync(filePath, 'utf8');

const title = "Warum der Mittelstand bei KI-Automatisierung noch schläft (und wie wir aufwachen)";
const excerpt = "KI ist längst kein Hype mehr, sondern eine handfeste Überlebensfrage für den B2B-Mittelstand. Doch die Realität in DACH und der EU sieht anders aus: 94 % der deutschen Mittelständler setzen KI noch immer nicht operativ ein.";
const htmlContent = `
<p><strong>KI ist längst kein Hype mehr, sondern eine handfeste Überlebensfrage für den B2B-Mittelstand.</strong> Doch die Realität in DACH und der EU sieht anders aus: Laut aktuellen Zahlen aus 2026 setzen 94 % der deutschen Mittelständler KI noch immer nicht operativ ein. Woran hakt es und wie kommen wir ins Tun?</p>

<p>Wenn man sich die neuesten Marktberichte ansieht, könnte man meinen, wir leben in zwei verschiedenen Welten. Auf der einen Seite die Tech-Riesen, die ihre Prozesse mit KI-Agenten auf Steroide pumpen. Auf der anderen Seite der europäische Mittelstand, der oft noch mit Papierformularen und isolierten RPA-Bots kämpft.</p>

<p>Wir reden hier nicht von futuristischen Robotern, sondern von handfesten, langweiligen Prozessen: Rechnungseingang, Bestandsmanagement, Lead-Qualifizierung. Dort, wo KI heute schon massive Kostenblöcke reduziert und Fachkräfte entlastet.</p>

<p><strong>Das Problem: Pilot-Friedhöfe statt Strategie</strong><br>Warum hinken wir hinterher? Es ist meist nicht die böse DSGVO, die uns ausbremst. Es sind handgemachte Probleme:</p>
<ul>
  <li><strong>Führung ohne Kompass:</strong> Es fehlt schlicht an einer klaren KI-Strategie. Viele stürzen sich in blindwütige Pilotprojekte ohne messbare KPIs.</li>
  <li><strong>Miese Daten:</strong> KI braucht sauberes Futter. Wenn das CRM ein Datenmüllhaufen ist, hilft der beste Algorithmus nicht.</li>
  <li><strong>Inseldenken statt End-to-End:</strong> Ein isolierter Bot, der Mails sortiert, ist nett. Aber echte Automatisierung erfordert das Standardisieren von Kernprozessen.</li>
</ul>

<p><strong>Raus aus der Schockstarre</strong><br>Es braucht keinen 100-Seiten-Masterplan von einer teuren Unternehmensberatung. Was es braucht, ist Pragmatismus:</p>
<ol>
  <li><strong>Dreckige Daten aufräumen:</strong> Beginnen Sie mit der Datenhygiene in einem Kernsystem.</li>
  <li><strong>Den größten Schmerzpunkt suchen:</strong> Welcher Prozess frisst aktuell die meisten manuellen Stunden?</li>
  <li><strong>Klein starten, aber integriert:</strong> Implementieren Sie eine KI-Lösung, die diesen einen Prozess automatisiert, aber mit den bestehenden Systemen spricht.</li>
</ol>

<p><strong>Fazit:</strong> Der Mittelstand muss aufhören, KI als IT-Spielzeug zu betrachten. Es ist ein operatives Werkzeug, das heute schon den Unterschied zwischen Wettbewerbsfähigkeit und Bedeutungslosigkeit ausmacht. Wer jetzt anpackt, sichert sich für die nächsten Jahre ab.</p>
`;

let maxId = 0;
const idMatches = content.match(/id:\s*(\d+),/g);
if (idMatches) {
    idMatches.forEach(m => {
        const num = parseInt(m.replace(/\D/g, ''));
        if (num > maxId) maxId = num;
    });
}
const newId = maxId + 1;

const slug = title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const today = new Date().toISOString().split('T')[0];

const newPostBlock = `  {
    id: ${newId},
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    excerpt: '${excerpt.replace(/'/g, "\\'")}',
    content: \`
${htmlContent.trim()}
\`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '${today}',
    status: 'published',
    image: '',
    readTime: 4
  },
`;

content = content.replace("export const blogPosts = [", "export const blogPosts = [\n" + newPostBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Artikel eingefügt: " + slug);
