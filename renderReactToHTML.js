require("@babel/register")({
  extensions: [".js", ".jsx"],
});

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const path = require("path");

// List of React components to be rendered
const components = {
  Bibliography: require("./src/components/Bibliography").default,
  Citation: require("./src/components/Citation").default,
  CitationFootnote: require("./src/components/CitationFootnote").default,
  Figure: require("./src/components/Figure").default,
  FigReference: require("./src/components/FigureReference").default,
  TableHorizontal: require("./src/components/TableHorizontal").default,
  TableReference: require("./src/components/TableReference").default,
  TableVertical: require("./src/components/TableVertical").default,
  TableVerticalNoCap: require("./src/components/TableVerticalNoCap").default,
};

// Directory containing MDX files
const inputDir = path.join(__dirname, "docs");
const outputDir = path.join(__dirname, "temp-mdx"); // Store modified MDX files here

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to read all MDX files
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

// Function to replace React components with their rendered HTML
const processMdxFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");

  // Replace each React component instance with its rendered HTML
  Object.entries(components).forEach(([componentName, Component]) => {
    const regex = new RegExp(`<${componentName}(.*?)\/>`, "g");

    content = content.replace(regex, (match, propsString) => {
      try {
        // Parse props if any are provided (basic key-value handling)
        const props = {};
        propsString
          .trim()
          .split(/\s+/)
          .forEach((pair) => {
            const [key, value] = pair.split("=");
            if (key && value) {
              props[key] = value.replace(/['"]/g, ""); // Remove quotes
            }
          });

        // Render React component to static HTML
        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(Component, props)
        );
        return html;
      } catch (error) {
        console.error(`Error rendering component ${componentName}:`, error);
        return match; // Keep original if error occurs
      }
    });
  });

  // Write the modified content to a new file
  const relativePath = path.relative(inputDir, filePath);
  const outputFilePath = path.join(outputDir, relativePath);
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  fs.writeFileSync(outputFilePath, content);

  console.log(`✅ Processed: ${filePath}`);
};

// Process all `.mdx` files
const mdxFiles = getAllMdxFiles(inputDir);
mdxFiles.forEach(processMdxFile);

console.log("✅ All MDX files processed. Modified files are in:", outputDir);
