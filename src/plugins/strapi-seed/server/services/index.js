"use strict";

const contentTypes = require("./content-types");
const readWrite = require("./read-write");
const seedModel = require("./seed-model");

module.exports = {
  seedModel,
  readWrite,
  contentTypes,
};
