const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

function pickFontFile(candidates) {
  for (const candidate of candidates) {
    try {
      if (candidate && fs.existsSync(candidate)) return candidate;
    } catch {}
  }
  return null;
}

function registerFonts(doc) {
  const families = [
    {
      name: "Calibri",
      regular: "C:\\Windows\\Fonts\\calibri.ttf",
      bold: "C:\\Windows\\Fonts\\calibrib.ttf",
      mono: "C:\\Windows\\Fonts\\consola.ttf"
    },
    {
      name: "SegoeUI",
      regular: "C:\\Windows\\Fonts\\segoeui.ttf",
      bold: "C:\\Windows\\Fonts\\segoeuib.ttf",
      mono: "C:\\Windows\\Fonts\\consola.ttf"
    },
    {
      name: "Arial",
      regular: "C:\\Windows\\Fonts\\arial.ttf",
      bold: "C:\\Windows\\Fonts\\arialbd.ttf",
      mono: "C:\\Windows\\Fonts\\consola.ttf"
    }
  ];

  const family = families.find(f => fs.existsSync(f.regular)) || families[0];
  const regular = pickFontFile([family.regular]);
  const bold = pickFontFile([family.bold, family.regular]);
  const mono = pickFontFile([family.mono, family.regular]);

  if (regular) doc.registerFont("body", regular);
  if (bold) doc.registerFont("bold", bold);
  if (mono) doc.registerFont("mono", mono);

  return {
    body: regular ? "body" : "Helvetica",
    bold: bold ? "bold" : "Helvetica-Bold",
    mono: mono ? "mono" : "Courier"
  };
}

function ensureSpace(doc, heightNeeded) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + heightNeeded > bottom) doc.addPage();
}

function main() {
  const repoRoot = path.join(__dirname, "..");
  const mdPath = path.join(repoRoot, "docs", "FUNCIONALIDADES.md");
  const outPath = path.join(repoRoot, "docs", "REPORT_PROD_MYSQL_Funcionalidades.pdf");
  const pkgPath = path.join(repoRoot, "package.json");

  if (!fs.existsSync(mdPath)) {
    console.error(`Arquivo não encontrado: ${mdPath}`);
    process.exitCode = 1;
    return;
  }

  const pkg = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, "utf8")) : {};
  const md = fs.readFileSync(mdPath, "utf8").replace(/\r\n/g, "\n");
  const lines = md.split("\n");

  const doc = new PDFDocument({
    size: "A4",
    margin: 48,
    info: {
      Title: "REPORT_PROD_MYSQL — Funcionalidades",
      Author: "",
      Subject: "Documento de funcionalidades do sistema",
      Keywords: "report, producao, mysql, painel, funcionalidades"
    }
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  doc.pipe(fs.createWriteStream(outPath));

  const fonts = registerFonts(doc);
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // Capa
  doc.font(fonts.bold).fontSize(22).fillColor("#111827");
  doc.text("REPORT_PROD_MYSQL", { align: "left" });
  doc.moveDown(0.25);
  doc.font(fonts.body).fontSize(14).fillColor("#374151");
  doc.text("Funcionalidades do sistema", { align: "left" });
  doc.moveDown(1.25);
  doc.font(fonts.body).fontSize(10).fillColor("#6B7280");

  const version = pkg?.version ? `v${pkg.version}` : "";
  const generatedAt = new Date().toISOString().replace("T", " ").slice(0, 19);
  doc.text(`Gerado em: ${generatedAt}`, { align: "left" });
  if (version) doc.text(`Versão do projeto: ${version}`, { align: "left" });
  doc.text(`Fonte: docs/FUNCIONALIDADES.md`, { align: "left" });

  doc.addPage();

  // Render simples do Markdown (títulos, listas e blocos de código)
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine ?? "";

    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      doc.moveDown(0.2);
      continue;
    }

    if (inCodeBlock) {
      const text = line.replace(/\t/g, "    ");
      doc.font(fonts.mono).fontSize(9).fillColor("#111827");
      const h = doc.heightOfString(text || " ", { width: pageWidth });
      ensureSpace(doc, h);
      doc.text(text || " ", { width: pageWidth });
      continue;
    }

    if (!line.trim()) {
      doc.moveDown(0.35);
      continue;
    }

    const h1 = /^#\s+(.+)$/.exec(line);
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    const bullet = /^-\s+(.+)$/.exec(line);
    const nestedBullet = /^\s{2,}-\s+(.+)$/.exec(line);

    if (h1) {
      doc.font(fonts.bold).fontSize(18).fillColor("#111827");
      const text = h1[1].trim();
      const height = doc.heightOfString(text, { width: pageWidth });
      ensureSpace(doc, height + 6);
      doc.text(text, { width: pageWidth });
      doc.moveDown(0.25);
      continue;
    }

    if (h2) {
      doc.font(fonts.bold).fontSize(14).fillColor("#111827");
      const text = h2[1].trim();
      const height = doc.heightOfString(text, { width: pageWidth });
      ensureSpace(doc, height + 10);
      doc.moveDown(0.2);
      doc.text(text, { width: pageWidth });
      doc.moveDown(0.15);
      continue;
    }

    if (h3) {
      doc.font(fonts.bold).fontSize(12).fillColor("#111827");
      const text = h3[1].trim();
      const height = doc.heightOfString(text, { width: pageWidth });
      ensureSpace(doc, height + 8);
      doc.moveDown(0.1);
      doc.text(text, { width: pageWidth });
      doc.moveDown(0.1);
      continue;
    }

    if (nestedBullet) {
      doc.font(fonts.body).fontSize(10.5).fillColor("#111827");
      const text = `• ${nestedBullet[1].trim()}`;
      const height = doc.heightOfString(text, { width: pageWidth - 24 });
      ensureSpace(doc, height + 2);
      doc.text(text, { width: pageWidth, indent: 24, paragraphGap: 2 });
      continue;
    }

    if (bullet) {
      doc.font(fonts.body).fontSize(10.5).fillColor("#111827");
      const text = `• ${bullet[1].trim()}`;
      const height = doc.heightOfString(text, { width: pageWidth - 12 });
      ensureSpace(doc, height + 2);
      doc.text(text, { width: pageWidth, indent: 12, paragraphGap: 2 });
      continue;
    }

    // Parágrafo
    doc.font(fonts.body).fontSize(10.5).fillColor("#111827");
    const paragraph = line.trim();
    const height = doc.heightOfString(paragraph, { width: pageWidth });
    ensureSpace(doc, height + 2);
    doc.text(paragraph, { width: pageWidth });
  }

  // Rodapé simples com paginação
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.font(fonts.body).fontSize(8).fillColor("#6B7280");
    doc.text(
      `Página ${i + 1} de ${range.count}`,
      doc.page.margins.left,
      doc.page.height - doc.page.margins.bottom + 16,
      { width: pageWidth, align: "right" }
    );
  }

  doc.end();

  // eslint-disable-next-line no-console
  console.log(`OK: PDF gerado em ${outPath}`);
}

main();

