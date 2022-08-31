// 'use strict'

const { spawn, exec } = require("child_process");
const { fgGreen, fgRed, fgYellow, printableText, bgCyan } = require("./utils");

console.log(bgCyan, printableText.INITIATE_PRE_COMMIT_HOOK);

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
  if (data.toString() === "master" || data.toString() === "main") {
    console.log(
      fgRed,
      printableText.COMMIT_TO_MAIN_BRANCH + printableText.WRONG_TICK
    );
  } else if (data.toString().length == 0) {
    console.log(
      fgRed,
      printableText.COMMIT_TO_MAIN_BRANCH + printableText.WRONG_TICK
    );
  } else {
    console.log(
      fgGreen,
      printableText.COMMIT_TO_NON_MAIN_BRANCH + printableText.CORRECT_TICK
    );
  }
});

isMasterBranch.on("error", (code) => {
  console.log(
    fgRed,
    printableText.COMMIT_BRANCH_ERROR + printableText.WRONG_TICK
  );
  process.exit(code);
});

formatter.on("exit", (code, signal) => {
  if (code == 2) {
    console.log(
      fgRed,
      printableText.FORMATTER_CODE_2 + printableText.WRONG_TICK
    );
    process.exit(code);
  } else if (code == 1) {
    console.log(
      fgYellow,
      printableText.FORMATTER_CODE_1 + printableText.WRONG_TICK
    );
    process.exit(code);
  } else if (code == 0) {
    console.log(
      fgGreen,
      printableText.FORMATTER_CODE_0 + printableText.CORRECT_TICK
    );
    exec("git add .", (error, stdout, stderr) => {
      if (error) {
        process.exit(1);
      } else {
        console.log(bgCyan, printableText.STAGING_FORMATTED_CHANGES);
        console.log(stdout);
      }
    });
  }
});

formatter.on("error", (code) => {
  console.log(fgRed, printableText.FORMATTER_ERROR + printableText.WRONG_TICK);
  process.exit(code);
});

formatter.stdout.on("data", (data) => {
  console.log(data.toString().trim());
});
