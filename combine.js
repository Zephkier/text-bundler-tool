const fs = require("fs");
const path = require("path");

const inputDirectory = "./input";
const outputDirectory = process.cwd();
const outputFile = path.join(outputDirectory, "output by .js file.txt");

// Check if there are any files in inputDirectory
const files = fs.readdirSync(inputDirectory);
if (files.length === 0) {
  console.error("Error: No files found in the input directory.");
  fs.rmSync(outputFile, { force: true });
  process.exit(1);
}

// Remove existing output file
fs.rmSync(outputFile, { force: true });

// Flag to track whether it's the first file
let firstFile = true;

// Loop through each file in inputDirectory
for (const file of files) {
  const filePath = path.join(inputDirectory, file);

  // Add heading with file name
  if (firstFile) {
    fs.appendFileSync(outputFile, `combined by .js file :)\n\n\n-------------------- ${file} --------------------\n`);
    firstFile = false;
  } else {
    fs.appendFileSync(outputFile, `\n\n\n-------------------- ${file} --------------------\n`);
  }

  // Concatenate the content of the file
  const content = fs.readFileSync(filePath, "utf-8");
  fs.appendFileSync(outputFile, content);
}

console.log("Combined files saved to", outputFile);
