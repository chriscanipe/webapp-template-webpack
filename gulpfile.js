"use strict";
const colors = require("ansi-colors");
const gulp = require("gulp");
const log = require("fancy-log");
const minimist = require("minimist");
const shell = require("gulp-shell");

const projectConfig = require("./project.config.json");
// const prodUrl = `https://${projectConfig.s3.bucket}/${
//   projectConfig.s3.folder
// }/index.html`;
const date = new Date();
// const timestamp = {
//   year: date.getFullYear(),
//   month: (date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1),
//   date: (date.getDate() < 10 ? "0" : "") + date.getDate(),
//   hour: (date.getHours() < 10 ? "0" : "") + date.getHours(),
//   min: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
//   sec: (date.getSeconds() < 10 ? "0" : "") + date.getSeconds(),
// };

const defaultOptions = {
  string: "port",
  default: {
    port: 3000,
  },
  alias: {
    p: "port",
  },
};
const argv = minimist(process.argv.slice(2), defaultOptions);

// Setup tasks
gulp.task(
  "setup:analyzer",
  shell.task("npm install --global webpack webpack-cli webpack-bundle-analyzer")
);
gulp.task("setup:analyzer").description =
  "Installs dependencies to analyze the JS bundle";
gulp.task("setup:aws", shell.task(["pip install awscli", "aws init"]));
gulp.task("setup:aws").description =
  "Installs & initilizes awscli for deploying visuals";
gulp.task("setup:lint", shell.task("npm install --global eslint stylelint"));
gulp.task("setup:lint").description =
  "Installs linters to catch style & semantic errors";
gulp.task("setup:imgmin", shell.task("brew install libpng"));
gulp.task("setup:imgmin").description =
  "Installs an image optimizing dependency";
gulp.task("setup:yarn", shell.task("brew install yarn"));
gulp.task("setup:yarn").description =
  "Installs package manager for the generator";
gulp.task(
  "setup",
  gulp.parallel(
    "setup:analyzer",
    "setup:aws",
    "setup:imgmin",
    "setup:lint",
    "setup:yarn"
  )
);
gulp.task("setup").description =
  "Installs all external dependencies for using the generator";

// Development tasks
gulp.task(
  "analyze",
  shell.task(
    "webpack -p --json > webpack-stats.json && webpack-bundle-analyzer --default-sizes gzip webpack-stats.json dist"
  )
);

gulp.task("analyze").description =
  "Generates a treemap of the JS. Useful for optimizing bundle size.";

  
gulp.task("lint", shell.task("eslint src/js && stylelint src/sass"));
gulp.task("lint").description =
  "Runs a linter to check your code for errors and style";
gulp.task(
  "serve",
  shell.task(
    `./node_modules/.bin/webpack-dev-server --hot --host 0.0.0.0 --port ${
      argv.port
    } --mode development`
  )
);
gulp.task("serve").description = "Runs a local development server. Accepts --port, -p integer";
gulp.task("watch", shell.task("./node_modules/.bin/webpack -p --watch"));
gulp.task("watch").description = "Rebuilds the dist/ subdirectory whenever you make changes";



// gulp.task(
//   "localip",
//   shell.task([
//     `echo "http://\`ipconfig getifaddr en0\`:${argv.port}" | pbcopy`,
//     'echo "\ncopied url to your clipboard:"',
//     `echo "http://\`ipconfig getifaddr en0\`:${argv.port}\n"`,
//   ])
// );
// gulp.task("localip").description = "Copy the local ip to your clipboard for device testing. Accepts --port, -p integer";

gulp.task("build", shell.task("./node_modules/.bin/webpack -p"));
gulp.task("build").description = "Compile all your code, styles, and assets to the dist/ subdirectory";

gulp.task("clean", shell.task("rm -rf dist"));
gulp.task("clean").description = "Removes the dist/ subdirectory";

gulp.task("default", gulp.series("serve"));
gulp.task("default").description = "Runs a local development server";
