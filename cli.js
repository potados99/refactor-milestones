#!/usr/bin/env node

const { run } = require("./index");
const { program } = require("commander");

const args = program
  .showSuggestionAfterError(true)
  .showHelpAfterError(true)
  .option("-p, --prefix [string]", "path that will be used as cwd")
  .option("-v, --verbose", "print all information")
  .parse()
  .opts();

(async function () {
  try {
    await run(args);
  } catch (e) {
    program.error(e.message);
  }
})();
