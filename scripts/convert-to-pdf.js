const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define input and output directories
const tempMdxDir = path.join(__dirname, "../temp-mdx");
const outputDir = path.join(__dirname, "../static", "pdfs");
const templatePath = path.join(__dirname, "pdf-template.tex");

// Ensure temp-mdx directory exists
if (!fs.existsSync(tempMdxDir)) {
  fs.mkdirSync(tempMdxDir, { recursive: true });
  console.log("✅ temp-mdx directory created.");
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Step 1: Run renderReactToHTML.js to generate temp-mdx files
console.log("🛠️ Running renderReactToHTML.js to process React components...");
try {
  execSync("node scripts/renderReactToHTML.js", {
    stdio: "inherit",
    shell: true,
  });
  console.log("✅ Finished processing React components.");
} catch (error) {
  console.error("❌ Failed to process React components:", error.message);
  process.exit(1); // Stop execution if preprocessing fails
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

// Function to wait for the .mdx files to appear
const waitForMdxFiles = (dir, timeout = 60000) => {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const checkFiles = () => {
      const files = getAllMdxFiles(dir);
      if (files.length > 0) {
        resolve(files);
      } else if (Date.now() - startTime >= timeout) {
        reject("Timeout reached while waiting for .mdx files.");
      } else {
        setTimeout(checkFiles, 500); // Check again after 500ms
      }
    };
    checkFiles();
  });
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
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    execSync(
      `pandoc "${inputFilePath}" -o "${outputFilePath}" \
      --template="${templatePath}" \
      --pdf-engine=xelatex \
      --resource-path="${resourcePath}" \
      --toc \
      --metadata title="RMC Report" \
      --metadata author="Risk Management Center" \
      --metadata date="${currentDate}",
      --include-in-header="\\usepackage{amsmath}",
      --include-in-header="\\newcommand{\\tightlist}{}",
      --katex`,
      { stdio: "inherit", shell: true }
    );
    console.log(`✅ Successfully created: ${outputFilePath}`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputFilePath}:`, error.message);
  }
};

// Step 2: Delete existing PDFs before generating new ones
deleteExistingPdfs();

// Step 3: Wait for the .mdx files to be ready and convert them to PDF
waitForMdxFiles(tempMdxDir)
  .then((mdxFiles) => {
    // First, convert the .mdx files to PDFs
    mdxFiles.forEach(convertToPDF);
    console.log("🎉 PDF conversion complete!");

    // After all PDF conversion is done, clean up the temp-mdx files
    //cleanupTempMdx();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1); // Stop execution if no files are found or timeout occurs
  });

// Step 4: Clean up the temp-mdx files after conversion
const cleanupTempMdx = () => {
  console.log("🧹 Cleaning up temp-mdx files...");

  // Delete all files and folders inside temp-mdx but leave the temp-mdx folder itself intact
  fs.readdirSync(tempMdxDir).forEach((file) => {
    const filePath = path.join(tempMdxDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively remove subdirectories
      fs.rmdirSync(filePath, { recursive: true });
      console.log(`🗑️ Deleted directory: ${filePath}`);
    } else {
      // Remove individual files
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted file: ${filePath}`);
    }
  });

  console.log("✅ temp-mdx files deleted.");
};
