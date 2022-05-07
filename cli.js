#!/usr/bin/env node

const { run } = require("./index");
const { program } = require("commander");

const args = program
  .option("-p, --prefix [string]", "Path to project")
  .option("-v, --verbose", "Print all information")
  .parse()
  .opts();

(async function () {
  await run(args);
})();
