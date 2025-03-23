const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define input and output directories
const inputDir = path.join(__dirname, "docs");
const outputDir = path.join(__dirname, "static", "pdfs");

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
      fs.unlinkSync(filePath); // Delete the file
      console.log(`Deleted existing PDF: ${filePath}`);
    }
  });
};

// Convert MDX to PDF
const convertToPDF = (inputFilePath) => {
  // Generate relative output path by removing the docs directory
  const relativePath = path.relative(inputDir, inputFilePath);

  // Debugging output to see the paths
  console.log(`Input File Path: ${inputFilePath}`);
  console.log(`Relative Path: ${relativePath}`);

  const outputFilePath = path.join(
    outputDir,
    relativePath.replace(".mdx", ".pdf")
  );

  // Ensure subdirectories exist in outputDir
  const outputSubDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  console.log(`Converting ${inputFilePath} to PDF...`);

  try {
    execSync(
      `pandoc "${inputFilePath}" -o "${outputFilePath}" -f markdown --pdf-engine=xelatex`,
      { stdio: "inherit" }
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
