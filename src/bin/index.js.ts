#!/usr/bin/env node
require = require("@std/esm")(module);
const { handler } = require("./index.mjs");
module.exports = { handler };
