#!/usr/bin/env node
require = require("esm")(module);
const { handler } = require("./index.mjs");
module.exports = { handler };
