const fgGreen = "\x1b[32m%s\x1b[0m";
const fgRed = "\x1b[31m%s\x1b[0m";
const fgYellow = "\x1b[33m%s\x1b[0m";
const fgCyan = "\x1b[36m%s\x1b[0m";
const bgGreen = "\x1b[42m%s\x1b[0m";
const bgRed = "\x1b[41m%s\x1b[0m";
const bgYellow = "\x1b[43m%s\x1b[0m";
const bgCyan = "\x1b[46m%s\x1b[0m";
const minimumCommitMsgLength = 3;
const gitmoji = Object.freeze({
  ":tada:": "Initial commit",
  ":bookmark:": "Version tag",
  ":sparkles:": "New feature",
  ":bug:": "Bugfix",
  ":card_index:": "Metadata",
  ":books:": "Documentation",
  ":bulb:": "Documenting source code",
  ":racehorse:": "Performance",
  ":lipstick:": "Cosmetic",
  ":rotating_light:": "Tests",
  ":white_check_mark:": "Adding a test",
  ":heavy_check_mark:": "Make a test pass",
  ":zap:": "General update",
  ":art:": "Improve format/structure",
  ":hammer:": "Refactor code",
  ":fire:": "Removing code/files",
  ":green_heart:": "Continuous Integration",
  ":lock:": "Security",
  ":arrow_up:": "Upgrading dependencies",
  ":arrow_down:": "Downgrading dependencies",
  ":shirt:": "Lint",
  ":alien:": "Translation",
  ":pencil:": "Text",
  ":ambulance:": "Critical hotfix",
  ":rocket:": "Deploying stuff",
  ":apple:": "Fixing on MacOS",
  ":penguin:": "Fixing on Linux",
  ":checkered_flag:": "Fixing on Windows",
  ":construction:": "Work in progress",
  ":construction_worker:": "Adding CI build system",
  ":chart_with_upwards_trend:": "Analytics or tracking code",
  ":heavy_minus_sign:": "Removing a dependency",
  ":heavy_plus_sign:": "Adding a dependency",
  ":whale:": "Docker",
  ":wrench:": "Configuration files",
  ":package:": "Package.json in JS",
  ":twisted_rightwards_arrows:": "Merging branches",
  ":hankey:": "Bad code / need improv",
  ":rewind:": "Reverting changes",
  ":boom:": "Breaking changes",
  ":ok_hand:": "Code review changes",
  ":wheelchair:": "Accessibility",
  ":truck:": "Move/rename repository",
  ":technologist:": "Improve developer experience",
  ":recycle:": "Refactor code",
});
const printableText = Object.freeze({
  //Unicode characters
  CORRECT_TICK: "\u2713",
  WRONG_TICK: "\u274c",

  // Hook Headers
  INITIATE_PRE_COMMIT_HOOK: "Initiating pre-commit hook...",
  INITIATE_COMMIT_HOOK: "Initiating commit hook...",

  // pre-commit strings
  // pre-commit check branch
  COMMIT_TO_MAIN_BRANCH:
    "Cannot commit to main branch. Consider switching to a different branch ",
  COMMIT_TO_NON_MAIN_BRANCH: "Committing to a non-main branch ",
  COMMIT_BRANCH_ERROR: "Error while checking commit branch ",

  // pre-commit formatting
  STAGING_FORMATTED_CHANGES: "Staging formatted changes...",

  // message is taken from prettier docs
  FORMATTER_CODE_0: "Changes formatted properly ",
  FORMATTER_CODE_1: "Something wasn't formatted properly ",
  FORMATTER_CODE_2: "Something's wrong with Prettier ",
  FORMATTER_ERROR: "Error while running prettier ",

  //commit hook strings
  COMMIT_MESSAGE_LENGTH: "Commit message should be atleast 3 words long ",
  COMMIT_MESSAGE_BEGINS_WITH_GITMOJI:
    "Commit message should begin with an appropriate Gitmoji ",
  EMPTY_COMMIT_MESSAGE: "Commit message cannot be empty ",
});

module.exports = {
  fgGreen,
  fgRed,
  fgYellow,
  bgGreen,
  bgRed,
  bgYellow,
  fgCyan,
  bgCyan,
  minimumCommitMsgLength,
  gitmoji,
  printableText,
};
