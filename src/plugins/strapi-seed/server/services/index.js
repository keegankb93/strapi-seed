"use strict";

const myService = require("./my-service");
const writeFile = require("./write-file");
const contentTypes = require("./content-types");
const findSeed = require("./find-seed");
const seedModel = require("./seed-model");

module.exports = {
  seedModel,
  findSeed,
  contentTypes,
  writeFile,
  myService,
};
