/* Client-side PDF text extraction via pdfjs-dist (lazy-loaded so it never
   weighs down the initial bundle). Returns plain text, capped at 8000 chars. */
export async function extractPdfText(file) {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const buf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  const pages = Math.min(pdf.numPages, 4);
  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i);
    const tc = await page.getTextContent();
    text += tc.items.map((it) => it.str || "").join(" ") + "\n";
  }
  return text.replace(/\s+/g, " ").trim().slice(0, 8000);
}
