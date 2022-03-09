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
    const dirs = ["seeds", "tmp"];
    for (let i = 0; i < dirs.length; i++) {
      if (!fs.existsSync(path.join(__dirname, `/${dirs[i]}`))) {
        fs.mkdirSync(path.join(__dirname, `/${dirs[i]}`));
      }
    }
  }

  initFolders();
  seededItemTracker();
};
