const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define directories
const inputDir = path.join(__dirname, "temp-mdx"); // Use preprocessed MDX files
const outputDir = path.join(__dirname, "static", "pdfs");
const templatePath = path.join(__dirname, "pdf-template.tex");
const resourcePath = path.join(__dirname, "static");

// Ensure necessary directories exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(inputDir)) {
  console.error(
    "❌ Error: temp-mdx/ directory does not exist. Run preprocessing first."
  );
  process.exit(1);
}

// Step 1: Run renderReactToHTML.js to process React components
console.log("🛠️ Running renderReactToHTML.js to process React components...");
try {
  execSync("node renderReactToHTML.js", { stdio: "inherit" });
  console.log("✅ React components rendered successfully.");
} catch (error) {
  console.error("❌ Failed to process React components:", error.message);
  process.exit(1);
}

// Function to find all .mdx files
const getAllMdxFiles = (dir) => {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllMdxFiles(fullPath));
    } else if (file.endsWith(".mdx")) {
      files.push(fullPath);
    }
  });
  return files;
};

// Delete existing PDFs only if they match an MDX file
const deleteExistingPdfs = (mdxFiles) => {
  const existingPdfs = fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith(".pdf"));

  existingPdfs.forEach((pdfFile) => {
    const correspondingMdxFile = mdxFiles.find(
      (mdx) => path.basename(mdx, ".mdx") === path.basename(pdfFile, ".pdf")
    );
    if (correspondingMdxFile) {
      const pdfPath = path.join(outputDir, pdfFile);
      fs.unlinkSync(pdfPath);
      console.log(`🗑️ Deleted old PDF: ${pdfPath}`);
    }
  });
};

// Convert MDX to PDF
const convertToPDF = (inputFilePath) => {
  const relativePath = path.relative(inputDir, inputFilePath);
  const outputFilePath = path.join(
    outputDir,
    relativePath.replace(".mdx", ".pdf")
  );
  const outputSubDir = path.dirname(outputFilePath);

  // Ensure subdirectories exist
  if (!fs.existsSync(outputSubDir))
    fs.mkdirSync(outputSubDir, { recursive: true });

  console.log(`📄 Converting ${inputFilePath} to PDF...`);

  try {
    execSync(
      `pandoc "${inputFilePath}" -o "${outputFilePath}" \
      --template="${templatePath}" \
      --pdf-engine=xelatex \
      --resource-path="${resourcePath}" \
      --toc \
      --metadata title="RMC Report" \
      --metadata author="Risk Management Center" \
      --metadata date="$(date +%Y-%m-%d)"`,
      { stdio: "inherit", shell: true }
    );
    console.log(`✅ Successfully created: ${outputFilePath}`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputFilePath}:`, error.message);
  }
};

// Get all MDX files and delete outdated PDFs
const mdxFiles = getAllMdxFiles(inputDir);
if (mdxFiles.length === 0) {
  console.log(
    "⚠️ No .mdx files found in temp-mdx/. Ensure preprocessing is complete."
  );
} else {
  deleteExistingPdfs(mdxFiles);
  mdxFiles.forEach(convertToPDF);
}

// Optional: Clean up temp-mdx after conversion
console.log("🗑️ Cleaning up temp-mdx/...");
fs.rmSync(inputDir, { recursive: true, force: true });
console.log("✅ Cleanup complete.");
