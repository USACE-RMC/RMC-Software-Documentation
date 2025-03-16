const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const mdx = require("@mdx-js/mdx"); // This library will help parse the MDX files

// Assuming you have a method to get your MDX files, parse them, and extract the components and their props
const parseMDX = (filePath) => {
  const mdxContent = fs.readFileSync(filePath, "utf-8");

  // Use the mdx library to parse the content (this can be extended with custom logic)
  // This is just a basic example; you can extend it to specifically find component names and props
  const parsed = mdx.sync(mdxContent);

  // Return the parsed content. You can add logic here to extract the components and their props.
  return parsed;
};

// Load React components dynamically
const loadComponents = () => {
  const componentsPath = path.join(__dirname, "src", "components");
  const components = fs.readdirSync(componentsPath).map((file) => {
    if (file.endsWith(".jsx") || file.endsWith(".js")) {
      const componentName = path.basename(file, path.extname(file));
      const Component = require(path.join(componentsPath, file));
      return { name: componentName, component: Component };
    }
  });

  return components.filter(Boolean);
};

// Function to render React components to static HTML
const renderToHTML = () => {
  const components = loadComponents(); // Load all components dynamically
  const mdxFiles = fs
    .readdirSync(path.join(__dirname, "docs"))
    .filter((file) => file.endsWith(".mdx"));

  mdxFiles.forEach((mdxFile) => {
    const mdxFilePath = path.join(__dirname, "docs", mdxFile);
    const parsedContent = parseMDX(mdxFilePath); // Parse the MDX content

    // Assuming parsedContent contains a list of components used in the MDX file
    parsedContent.forEach(({ componentName, props }) => {
      // Dynamically find the component based on its name
      const component = components.find((comp) => comp.name === componentName);

      if (component) {
        // Render the component with the extracted props
        const htmlContent = ReactDOMServer.renderToStaticMarkup(
          React.createElement(component.component, props)
        );

        // Write the HTML content to a file
        const outputDir = path.join(__dirname, "output", "html");
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFilePath = path.join(
          outputDir,
          `${componentName}-${mdxFile}.html`
        );
        fs.writeFileSync(outputFilePath, htmlContent);
        console.log(
          `Rendered ${componentName} from ${mdxFile} to ${outputFilePath}`
        );
      }
    });
  });
};

// Run the function
renderToHTML();
