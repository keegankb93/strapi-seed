"use strict";
const file = require("./services/read-write");
const fs = require("fs");
const path = require("path");

module.exports = ({ strapi }) => {
  async function seededItemTracker() {
    const filename = "seeded-model-items.json";
    const res = await file.read({ filename: filename });
    if (res.error) {
      file.write({
        filename: "seeded-model-items.json",
        fileData: JSON.stringify({}, null, 2),
      });
    }
  }

  function initFolders() {
    if (!fs.existsSync(path.join(__dirname, `/tmp`))) {
      fs.mkdirSync(path.join(__dirname, `/tmp`));
      ``;
    }

    if (!fs.existsSync(path.join(__dirname, `../../../seeds`))) {
      fs.mkdirSync(path.join(__dirname, `../../../seeds`));
    }
  }

  initFolders();
  seededItemTracker();
};
