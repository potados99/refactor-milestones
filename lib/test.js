const fs = require("fs/promises");
const { program } = require("commander");

const testerFactories = {
  "file-includes": (operand) => async (filepath) => {
    const content = await fs.readFile(filepath);
    const text = content.toString();

    return text.includes(operand);
  },

  "file-not-includes": (operand) => async (filepath) => {
    const content = await fs.readFile(filepath);
    const text = content.toString();

    return !text.includes(operand);
  },
};

async function testFile(expressions, filepath) {
  const operators = Object.keys(expressions);

  for (const operator of operators) {
    const tester = getTester(expressions, operator);

    if ((await tester(filepath)) === false) {
      return false;
    }
  }

  return true;
}

function getTester(expressions, operator) {
  const testerFactory = testerFactories[operator];

  if (testerFactory == null) {
    program.error(
      `No supported test operator found with name '${operator}'. Please check your run configurations.`
    );
  }

  const operand = expressions[operator];

  return testerFactory(operand);
}

exports.testFile = testFile;
