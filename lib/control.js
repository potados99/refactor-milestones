const fs = require("fs/promises");
const path = require("path");

async function getRunControl(cwd) {
  const filepath = path.join(cwd || ".", ".refactoredrc");

  try {
    await fs.stat(filepath);
  } catch (e) {
    throw new Error(
      "No configuration file found. You may specify project path by passing --prefix argument."
    );
  }

  const content = await fs.readFile(filepath);

  try {
    return JSON.parse(content.toString().trim()/*important to cut out whitespaces*/);
  } catch (e) {
    console.error(e);

    throw new Error(
      "Failed to parse configuration file. Please make sure it is in a valid JSON format."
    );
  }
}

exports.readRunControl = getRunControl;
