const fg = require("fast-glob");
const { testFile } = require("./test");

async function examineTaskAchievement(task, cwd) {
  const { filePatterns, ignorePatterns, test: testExpressions } = task;

  const arrayOfFilepath = await fg(filePatterns, {
    cwd: cwd,
    ignore: [...ignorePatterns, ".refactoredrc"],
    dot: true,
  });

  const done = [];
  const undone = [];

  for (const filepath of arrayOfFilepath) {
    if (await testFile(testExpressions, filepath)) {
      done.push(filepath);
    } else {
      undone.push(filepath);
    }
  }

  return {
    done,
    undone,
  };
}

exports.examineTaskAchievement = examineTaskAchievement;
