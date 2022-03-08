"use strict";
const file = require("./services/read-write");

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

  seededItemTracker();
};
