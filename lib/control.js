const fs = require("fs/promises");
const path = require("path");
const { program } = require("commander");

async function getRunControl(cwd) {
  const filepath = path.join(cwd || ".", ".refactoredrc");

  try {
    await fs.stat(filepath);
  } catch (e) {
    program.error(
      "No configuration file found. You may specify project path by passing --prefix argument."
    );
  }

  const content = await fs.readFile(filepath);

  try {
    return JSON.parse(content.toString());
  } catch (e) {
    program.error(
      "Failed to parse configuration file. Please make sure it is in a valid JSON format."
    );
  }
}

exports.readRunControl = getRunControl;
