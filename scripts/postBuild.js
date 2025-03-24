const { execSync } = require("child_process");
const path = require("path");

const scriptsDir = path.join(__dirname); // The 'scripts' folder where postBuild.js is located
const convertScript = path.join(scriptsDir, "convert-to-pdf.js"); // Correct path to 'convert-to-pdf.js'

console.log("🛠️ Docusaurus build complete. Running PDF conversion...");

try {
  // Simply run the PDF conversion after the build has been completed
  execSync(`node "${convertScript}"`, {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(), // Ensure we're running from the root of the project
  });

  console.log("✅ PDF conversion completed successfully.");
} catch (error) {
  console.error("❌ PDF conversion failed:", error.message);
}
