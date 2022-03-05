const fs = require("fs");
const path = require("path");

module.exports = {
  findSeed: async (req) => {
    const { filename } = req;
    const fileData = fs.readFileSync(
      path.join(__dirname, `../seeds/${filename}`),
      "utf8"
    );
    return fileData;
  },
};
