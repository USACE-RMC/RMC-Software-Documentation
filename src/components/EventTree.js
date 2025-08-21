import { React, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Button from "@site/src/components/Button";

/* ---------- utils ---------- */

// "generic-internal-erosion" -> "Generic Internal Erosion Event Tree"
function formatAlt(base) {
  if (!base) return "";
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " Event Tree";
}

async function fetchAsBlob(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.blob();
}

async function fetchAsText(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Rasterize SVG -> PNG
async function svgBlobToPngBlob(svgBlob, { scale = 4 } = {}) {
  const svgUrl = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = svgUrl;
    await img.decode().catch(
      () =>
        new Promise((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej(new Error("Failed to load SVG for rasterization"));
        })
    );

    let width = img.naturalWidth || 0;
    let height = img.naturalHeight || 0;
    if (!width || !height) {
      const text = await svgBlob.text();
      const m = text.match(/viewBox\s*=\s*["']\s*([0-9.+-]+)\s+([0-9.+-]+)\s+([0-9.+-]+)\s+([0-9.+-]+)\s*["']/i);
      width = m ? parseFloat(m[3]) : 1200;
      height = m ? parseFloat(m[4]) : 800;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
    if (blob) return blob;

    const dataUrl = canvas.toDataURL("image/png");
    const byteString = atob(dataUrl.split(",")[1]);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
    return new Blob([bytes], { type: "image/png" });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

async function imageBlobToPngBlobAny(srcBlob) {
  if (srcBlob.type === "image/png") return srcBlob;

  const url = URL.createObjectURL(srcBlob);
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await img.decode().catch(
      () =>
        new Promise((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej(new Error("Failed to load image for conversion"));
        })
    );

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || 1200;
    canvas.height = img.naturalHeight || 800;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
    if (blob) return blob;

    const dataUrl = canvas.toDataURL("image/png");
    const byteString = atob(dataUrl.split(",")[1]);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
    return new Blob([bytes], { type: "image/png" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ---------- main component ---------- */
export default function EventTree({ base, text, imgExt = "png", sheetExt = "xlsm", imgDir = "/event-trees/images", sheetDir = "/event-trees/spreadsheets", width = "100%", pngScale = 4 }) {
  if (!base) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("EventTree: 'base' prop is required.");
    }
    return null;
  }

  const imgUrl = useBaseUrl(`${imgDir}/${base}.${imgExt}`);
  const sheetUrl = useBaseUrl(`${sheetDir}/${base}.${sheetExt}`);
  const altText = formatAlt(base);

  // UI states for button labels
  const [copyLabel, setCopyLabel] = useState("Copy image");
  const [downloadImgLabel, setDownloadImgLabel] = useState("Download image");
  const [downloadSheetLabel, setDownloadSheetLabel] = useState("Download spreadsheet");

  async function handleCopyImage(e) {
    e.preventDefault();
    setCopyLabel("Copied!");
    try {
      if (imgExt.toLowerCase() === "svg") {
        const svgText = await fetchAsText(imgUrl);
        if ("clipboard" in navigator && typeof window.ClipboardItem === "function") {
          const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
          await navigator.clipboard.write([new window.ClipboardItem({ "image/svg+xml": svgBlob })]);
        }
      } else {
        const srcBlob = await fetchAsBlob(imgUrl);
        const pngBlob = await imageBlobToPngBlobAny(srcBlob);
        await navigator.clipboard.write([new window.ClipboardItem({ "image/png": pngBlob })]);
      }
    } finally {
      setTimeout(() => setCopyLabel("Copy image"), 2000);
    }
  }

  async function handleDownloadImage(e) {
    e.preventDefault();
    setDownloadImgLabel("Downloading...");
    try {
      const srcBlob = await fetchAsBlob(imgUrl);
      const pngBlob = imgExt.toLowerCase() === "svg" ? await svgBlobToPngBlob(srcBlob, { scale: pngScale }) : await imageBlobToPngBlobAny(srcBlob);
      downloadBlob(pngBlob, `${altText}.png`);
    } finally {
      setTimeout(() => setDownloadImgLabel("Download image"), 2000);
    }
  }

  async function handleDownloadSheet(e) {
    e.preventDefault();
    setDownloadSheetLabel("Downloading...");
    try {
      const sheetBlob = await fetchAsBlob(sheetUrl);
      downloadBlob(sheetBlob, `${altText}.${sheetExt}`);
    } finally {
      setTimeout(() => setDownloadSheetLabel("Download spreadsheet"), 2000);
    }
  }

  return (
    <section className="not-prose my-6">
      {text && <p className="text-normal text-font-color mb-3">{text}</p>}

      <figure className="m-0">
        <div
          className="
            inline-block
            rounded-xl border border-border-color
            p-3 md:p-4
            bg-background-theme dark:bg-[#f9f9f9]
            shadow-sm
            max-w-full
          "
          style={{ width }}
        >
          <img src={imgUrl} alt={altText} className="w-full h-auto" loading="lazy" />
        </div>
      </figure>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" onClick={handleCopyImage}>
          {copyLabel}
        </Button>

        <Button type="button" onClick={handleDownloadImage}>
          {downloadImgLabel}
        </Button>

        <Button type="button" onClick={handleDownloadSheet}>
          {downloadSheetLabel}
        </Button>
      </div>
    </section>
  );
}
