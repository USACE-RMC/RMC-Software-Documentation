const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define input and output directories
const tempMdxDir = path.join(__dirname, "temp-mdx");
const outputDir = path.join(__dirname, "static", "pdfs");
const templatePath = path.join(__dirname, "pdf-template.tex");

// Ensure temp-mdx directory exists
if (!fs.existsSync(tempMdxDir)) {
  fs.mkdirSync(tempMdxDir, { recursive: true });
}

// Step 1: Run renderReactToHTML.js to generate temp-mdx files
console.log("🛠️ Running renderReactToHTML.js to process React components...");
try {
  execSync("node renderReactToHTML.js", { stdio: "inherit", shell: true });
  console.log("✅ Finished processing React components.");
} catch (error) {
  console.error("❌ Failed to process React components:", error.message);
  process.exit(1); // Stop execution if preprocessing fails
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to recursively find all .mdx files
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

// Function to delete all existing PDFs
const deleteExistingPdfs = () => {
  fs.readdirSync(outputDir).forEach((file) => {
    const filePath = path.join(outputDir, file);
    if (filePath.endsWith(".pdf")) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted existing PDF: ${filePath}`);
    }
  });
};

// Convert MDX to PDF
const convertToPDF = (inputFilePath) => {
  const relativePath = path.relative(tempMdxDir, inputFilePath);
  const outputFilePath = path.join(
    outputDir,
    relativePath.replace(".mdx", ".pdf")
  );
  const outputSubDir = path.dirname(outputFilePath);

  // Ensure subdirectories exist in outputDir
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  console.log(`📄 Converting ${inputFilePath} to PDF...`);

  const resourcePath = path.join(__dirname, "static");

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

// Step 2: Delete existing PDFs before generating new ones
deleteExistingPdfs();

// Step 3: Convert processed .mdx files to PDF
const mdxFiles = getAllMdxFiles(tempMdxDir);
if (mdxFiles.length === 0) {
  console.log(
    "⚠️ No .mdx files found in temp-mdx/. Ensure preprocessing is complete."
  );
  process.exit(1); // Stop execution if no files are found
} else {
  mdxFiles.forEach(convertToPDF);
}

// Step 4: Clean up the temp-mdx files after conversion
const cleanupTempMdx = () => {
  console.log("🧹 Cleaning up temp-mdx files...");
  fs.rmdirSync(tempMdxDir, { recursive: true });
  console.log("✅ temp-mdx files deleted.");
};

cleanupTempMdx();

console.log("🎉 PDF conversion complete!");
