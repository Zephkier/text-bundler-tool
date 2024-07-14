const fs = require("fs");
const path = require("path");

let firstFile = true;
const inputDirectory = "./input";
const outputDirectory = process.cwd();
const outputFile = path.join(outputDirectory, "output by .js file.txt");

function processFilesInDirectory(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        entries.forEach((entry) => {
            const filePath = path.join(directory, entry.name);
            const relativePath = path.relative(inputDirectory, filePath);

            if (entry.isFile()) {
                // Add heading with file name
                if (firstFile) {
                    fs.appendFileSync(outputFile, `combined by .js file :)\n\n\n----- ----- ${relativePath} ----- -----\n`);
                    firstFile = false;
                } else {
                    fs.appendFileSync(outputFile, `\n\n----- ----- ${relativePath} ----- -----\n`);
                }

                // Concatenate the content of the file
                const content = fs.readFileSync(filePath, "utf8");
                fs.appendFileSync(outputFile, content);
            } else if (entry.isDirectory()) {
                processFilesInDirectory(filePath);
            }
        });
    });
}

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

// Check if the input directory is empty
if (fs.readdirSync(inputDirectory).length === 0) {
    console.error("Error: No files found in the input directory.");
    if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
    }
    process.exit(1);
}

// Remove the output file if it exists
if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
}

// Start processing files
processFilesInDirectory(inputDirectory);

console.log("Combined files saved to", outputFile);
