const { printReport } = require("./lib/print");
const { readRunControl } = require("./lib/control");
const { examineTaskAchievement } = require("./lib/task");

async function run(args) {
  const { prefix: cwd, verbose } = args;
  const { tasks } = await readRunControl(cwd);

  const results = [];

  for (const task of tasks) {
    const { name } = task;
    const { done, undone } = await examineTaskAchievement(task, cwd || '.');

    results.push({ name, done, undone });
  }

  printReport(results, verbose);
}

exports.run = run;
