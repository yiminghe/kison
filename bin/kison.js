#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
(function () {
  if (fs.existsSync(path.join(__dirname, '../lib'))) {
    require('../lib');
    return;
  }
  if (fs.existsSync(path.join(__dirname, '../src'))) {
    require('@babel/register')({
      extensions: ['.ts', '.js'],
    });
    require('../src/');
    return;
  }
})();
