const fs = require("fs-extra");
const path = require("path");

const appBin = path.join(__dirname, "../node_modules/.bin/kison");

const bin = path.join(__dirname, "../bin/kison.js");

fs.ensureSymlinkSync(bin, appBin);
