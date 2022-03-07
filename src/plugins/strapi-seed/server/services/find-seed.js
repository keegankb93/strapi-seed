const fs = require("fs");
const path = require("path");

module.exports = {
  findSeed: async (req) => {
    const { filename } = req;
    try {
      const fileData = fs.readFileSync(
        path.join(__dirname, `../seeds/${filename}`),
        "utf8"
      );
      return { success: fileData };
    } catch (e) {
      console.log(
        `File @ ${e.path} not found. You most likely have not saved any seed data for this model yet.`
      );
      return { error: e };
    }
  },
};
