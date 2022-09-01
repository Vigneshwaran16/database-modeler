// 'use strict'

const { spawn, exec } = require("child_process");
const {
  fgGreen,
  fgRed,
  bgYellow,
  printableText,
  bgCyan,
  consoler,
  bgGreen,
  bgRed,
} = require("./utils");

consoler(bgCyan, "HOOKS", printableText.INITIATE_PRE_COMMIT_HOOK);

const isMasterBranch = spawn("git symbolic-ref --short HEAD", [], {
  shell: true,
});
const formatter = spawn("npx prettier src/**/*.{ts,js} --write .", [], {
  shell: true,
});

isMasterBranch.on("exit", (code, signal) => {
  // continue
});

isMasterBranch.stdout.on("data", (data) => {
  if (
    data.toString().trim() === "master" ||
    data.toString().trim() === "main"
  ) {
    consoler(bgRed, "FAILED", printableText.COMMIT_TO_MAIN_BRANCH);
    process.exit(1);
  } else if (data.toString().length == 0) {
    consoler(bgRed, "FAILED", printableText.COMMIT_TO_MAIN_BRANCH);
    process.exit(1);
  } else {
    consoler(bgGreen, "PASSED", printableText.COMMIT_TO_NON_MAIN_BRANCH);
  }
});

isMasterBranch.on("error", (code) => {
  consoler(fgRed, "ERROR", printableText.COMMIT_BRANCH_ERROR);
  process.exit(code);
});

formatter.on("exit", (code, signal) => {
  if (code == 2) {
    consoler(bgRed, "Failed", printableText.FORMATTER_CODE_2);
    process.exit(code);
  } else if (code == 1) {
    consoler(bgYellow, "WARNING", printableText.FORMATTER_CODE_1);
    process.exit(code);
  } else if (code == 0) {
    consoler(bgGreen, "PASSED", printableText.FORMATTER_CODE_0);
    exec("git add .", (error, stdout, stderr) => {
      if (error) {
        process.exit(1);
      } else {
        consoler(bgCyan, "HOOKS", printableText.STAGING_FORMATTED_CHANGES);
      }
    });
  }
});

formatter.on("error", (code) => {
  consoler(bgRed, "ERROR", printableText.FORMATTER_ERROR);
  process.exit(code);
});

formatter.stdout.on("data", (data) => {
  console.log(data.toString().trim());
});
