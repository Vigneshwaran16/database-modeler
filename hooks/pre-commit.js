// 'use strict'

const { spawn, exec } = require("child_process");
const { fgGreen, fgRed, fgYellow, bgGreen, bgCyan } = require("./utils");

console.log(bgCyan, "Initiating pre-commit hook");

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
      "Cannot commit to main branch. Consider switching to a different branch \u274c"
    );
  } else if (data.toString().length == 0) {
    console.log(
      fgRed,
      "Cannot commit to main branch. Consider switching to a different branch \u274c"
    );
  } else {
    console.log(fgGreen, "Committing to a non-main branch \u2713");
  }
});

isMasterBranch.on("error", (code) => {
  console.log(fgRed, "Error while checking commit branch \u274c");
  process.exit(code);
});

formatter.on("exit", (code, signal) => {
  if (code == 2) {
    console.log(fgRed, "Something's wrong with Prettier \u274c");
    process.exit(code);
  } else if (code == 1) {
    console.log(fgYellow, "Something wasn't formatted properly \u274c");
    process.exit(code);
  } else if (code == 0) {
    console.log(fgGreen, "Changes formatted properly \u2713");
    exec("git add .", (error, stdout, stderr) => {
      if (error) {
        process.exit(1);
      } else {
        console.log(bgGreen, "Staging formatted changes...");
        console.log(stdout);
      }
    });
  }
});

formatter.on("error", (code) => {
  console.log(fgRed, "Error while running prettier \u274c");
  process.exit(code);
});

formatter.stdout.on("data", (data) => {
  console.log(data.toString().trim());
});
