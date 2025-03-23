const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define input and output directories
const inputDir = path.join(__dirname, "docs");
const outputDir = path.join(__dirname, "static", "pdfs");
const templatePath = path.join(__dirname, "pdf-template.tex");

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
  // Generate relative output path by removing the docs directory
  const relativePath = path.relative(inputDir, inputFilePath);
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

  // Define the relative path for static resources
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

// Delete existing PDFs before generating new ones
deleteExistingPdfs();

// Read all '.mdx' files and convert them
const mdxFiles = getAllMdxFiles(inputDir);
if (mdxFiles.length === 0) {
  console.log("⚠️ No .mdx files found in /docs or its subdirectories.");
} else {
  mdxFiles.forEach(convertToPDF);
}
