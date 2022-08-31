// 'use strict'

const { spawn, exec } = require("child_process");
const {
  fgGreen,
  fgRed,
  fgYellow,
  bgGreen,
  bgCyan,
  minimumCommitMsgLength,
  gitmoji,
  printableText,
} = require("./utils");
const fs = require("fs");

console.log(bgCyan, printableText.INITIATE_COMMIT_HOOK);
const commitMessage = fs.readFileSync(process.argv[2], "utf8").trim();

if (commitMessage.length) {
  console.log(
    fgGreen,
    printableText.EMPTY_COMMIT_MESSAGE + printableText.CORRECT_TICK
  );
  const commitMsg = commitMessage.split(" ");
  if (commitMsg.length < minimumCommitMsgLength) {
    console.log(
      fgRed,
      printableText.COMMIT_MESSAGE_LENGTH + printableText.WRONG_TICK
    );
    process.exit(1);
  } else {
    console.log(
      fgGreen,
      printableText.COMMIT_MESSAGE_LENGTH + printableText.CORRECT_TICK
    );
    let gitMoji = Object.keys(gitmoji);
    if (gitMoji.includes(commitMsg[0])) {
      console.log(
        fgGreen,
        printableText.COMMIT_MESSAGE_BEGINS_WITH_GITMOJI +
          printableText.CORRECT_TICK
      );
    } else {
      console.log(
        fgRed,
        printableText.COMMIT_MESSAGE_BEGINS_WITH_GITMOJI +
          printableText.WRONG_TICK
      );
      process.exit(1);
    }
  }
} else {
  console.log(
    fgRed,
    printableText.EMPTY_COMMIT_MESSAGE + printableText.WRONG_TICK
  );
  process.exit(1);
}
