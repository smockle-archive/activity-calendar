#!/usr/bin/env node

require = require('@std/esm')(module)
module.exports = {
  handler: require('./index.mjs').handler
}
