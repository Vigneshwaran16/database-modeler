// 'use strict'

const { spawn, exec } = require("child_process");
const {
  fgGreen,
  bgRed,
  consoler,
  bgGreen,
  bgCyan,
  minimumCommitMsgLength,
  gitmoji,
  printableText,
} = require("./utils");
const fs = require("fs");

consoler(bgCyan, "HOOKS", printableText.INITIATE_COMMIT_HOOK);
const commitMessage = fs.readFileSync(process.argv[2], "utf8").trim();

if (commitMessage.length) {
  consoler(bgGreen, "PASSED", printableText.EMPTY_COMMIT_MESSAGE);
  const commitMsg = commitMessage.split(" ");
  if (commitMsg.length < minimumCommitMsgLength) {
    consoler(bgRed, "FAILED", printableText.COMMIT_MESSAGE_LENGTH);
    process.exit(1);
  } else {
    consoler(bgGreen, "PASSED", printableText.COMMIT_MESSAGE_LENGTH);
    let gitMoji = Object.keys(gitmoji);
    if (gitMoji.includes(commitMsg[0])) {
      consoler(
        bgGreen,
        "PASSED",
        printableText.COMMIT_MESSAGE_BEGINS_WITH_GITMOJI
      );
    } else {
      console.log(
        bgRed,
        "FAILED",
        printableText.COMMIT_MESSAGE_BEGINS_WITH_GITMOJI
      );
      process.exit(1);
    }
  }
} else {
  console.log(bgRed, "FAILED", printableText.EMPTY_COMMIT_MESSAGE);
  process.exit(1);
}
