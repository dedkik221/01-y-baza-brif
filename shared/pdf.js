function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const testLine = current ? `${current} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, size);
    if (width <= maxWidth) {
      current = testLine;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  });

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export async function generateBriefPdf({ title, sections }) {
  const { PDFDocument, StandardFonts } = await import(
    "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm"
  );
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const lineHeight = 16;
  let page = pdfDoc.addPage();
  let { width, height } = page.getSize();
  let y = height - margin;

  function ensureSpace(lines = 1) {
    if (y - lines * lineHeight < margin) {
      page = pdfDoc.addPage();
      ({ width, height } = page.getSize());
      y = height - margin;
    }
  }

  function drawTextBlock(text, size = 12, useBold = false) {
    const currentFont = useBold ? fontBold : font;
    const maxWidth = width - margin * 2;
    const lines = wrapText(text, currentFont, size, maxWidth);
    lines.forEach((line) => {
      ensureSpace();
      page.drawText(line, { x: margin, y, size, font: currentFont });
      y -= lineHeight;
    });
  }

  drawTextBlock(title, 18, true);
  drawTextBlock(`Дата: ${new Date().toLocaleString("ru-RU")}`, 10, false);
  y -= lineHeight;

  sections.forEach((section) => {
    drawTextBlock(section.title, 14, true);
    section.items.forEach((item) => {
      drawTextBlock(`${item.label}: ${item.value}`, 11, false);
    });
    y -= lineHeight / 2;
  });

  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    fileName: `${title.replace(/\s+/g, "_")}.pdf`
  };
}
