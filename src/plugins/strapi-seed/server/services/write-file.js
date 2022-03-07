const fs = require("fs");
const path = require("path");

module.exports = {
  write: (data) => {
    const { filename, fileData } = data;
    const isSaved = fs.writeFile(
      path.join(__dirname, `../seeds/${filename}`),
      fileData,
      {
        flag: "w",
      },
      async (e) => {
        if (e) {
          return "bla";
        }
      }
    );
    if (isSaved === undefined)
      return { success: `${filename} successfully saved!` };
  },
};
