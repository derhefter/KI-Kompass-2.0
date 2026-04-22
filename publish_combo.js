const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'blog-posts.js');
let content = fs.readFileSync(filePath, 'utf8');

const title = "Hyperautomatisierung statt Pilotprojekte: So skaliert der Mittelstand 2026";
const excerpt = "2026 ist das Jahr, in dem wir aufhören, KI nur auszuprobieren. Die Spielwiese ist geschlossen. Der Trend geht unaufhaltsam zur Hyperautomatisierung. Wie das in der Praxis ohne Beratersprech aussieht, zeigen drei echte Mittelstands-Szenarien.";
const htmlContent = `
<p><strong>2026 ist das Jahr, in dem wir aufhören, KI nur auszuprobieren.</strong> Die Spielwiese ist geschlossen. Viele Betriebe haben in den letzten zwei Jahren einzelne Chatbots installiert oder isolierte Texte generieren lassen. Doch echte Wertschöpfung entsteht so nicht. Der Trend geht unaufhaltsam zur "Hyperautomatisierung" – also der End-to-End-Prozessautomatisierung. KI-Agenten übernehmen nicht mehr nur Teilaufgaben, sondern orchestrieren ganze Workflows im Hintergrund.</p>

<p><strong>Warum branchenspezifische Tiefe jetzt entscheidet:</strong><br>Erfolgreiche Skalierung bedeutet, dass die Technologie tief in die spezifischen Schmerzpunkte einer Branche eingreift. Wie das in der Praxis ohne Beratersprech aussieht, zeigen diese drei echten Mittelstands-Szenarien:</p>

<p><strong>1. Industrie & Fertigung: Der automatisierte Einkauf</strong><br><em>Der Prozess:</em> Eine Fräsmaschine meldet nicht nur, dass ein Verschleißteil bald ausfällt. Der KI-Agent prüft sofort den Lagerbestand, liest parallel die aktuellen Lieferanten-Mails nach Preisanpassungen aus und bereitet eine fertige, vorausschauende Bestellung im ERP vor. Der Einkäufer prüft nur noch die Konditionen und drückt auf "Senden".</p>

<p><strong>2. Handwerk: Baustellen-Doku ohne Zettelwirtschaft</strong><br><em>Der Prozess:</em> Der Bauleiter diktiert auf der Baustelle seine Notizen und fotografiert verbaute Materialien. Die KI wandelt die Sprache strukturiert in Text um, erkennt auf den Fotos die Artikelnummern und pflegt das Material direkt in die Branchensoftware ein. Das Angebot für Nachträge liegt am nächsten Morgen bereits als fertiger Entwurf auf dem Schreibtisch.</p>

<p><strong>3. Dienstleistung & Agenturen: KI-gestütztes Kunden-Onboarding</strong><br><em>Der Prozess:</em> Ein Neukunde lädt Dokumente hoch. Ein KI-Workflow prüft diese auf Vollständigkeit, extrahiert die relevanten Stammdaten, legt den Kunden im CRM an und erstellt automatisch die ersten Aufgaben-Tickets für das Projektteam. Der Projektmanager startet nicht mit Papierkram, sondern direkt mit der inhaltlichen Arbeit.</p>

<p><strong>Fazit & der realistische Weg dorthin:</strong><br>Suchen Sie sich einen dieser Prozesse in Ihrem Betrieb aus und automatisieren Sie diesen Ablauf konsequent von A bis Z.</p>

<p>Wichtig für die Praxisrealität: Für solche Lösungen brauchen Sie heute <strong>keine riesigen IT-Budgets oder teuren Software-Monolithen</strong> mehr. Die Werkzeuge sind da und bezahlbar. Was Sie jedoch zwingend brauchen, ist <strong>Fokus und Zeit</strong>, um die Prozesse im eigenen Betrieb einmal sauber glattzuziehen, bevor sie automatisiert werden.</p>

<p>Genau an diesem Punkt scheitern viele Betriebe im Alltagstrubel. Sie müssen das nicht alleine stemmen: Egal ob Sie intern Kapazitäten aufbauen oder sich erfahrene Begleitung von außen holen. Ich unterstütze Geschäftsführer und ihre Teams täglich dabei, diese Hebel zu identifizieren und die Technologie ohne Reibungsverluste auf die Straße zu bringen.</p>

<p>Machen Sie den ersten Schritt: <a href="/assessment">Im kostenlosen 5-Minuten-Check</a> sehen Sie sofort, welcher Prozess in Ihrem Betrieb aktuell das größte Automatisierungs-Potenzial bietet.</p>
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
fs.writeFileSync(path.join(__dirname, 'last_slug.txt'), slug);
console.log("Artikel eingefügt: " + slug);
