const fs = require("fs");
const path = require("path");

module.exports = {
  write: async (fileData) => {
    const { filename, data } = fileData;

    await fs.writeFile(
      path.join(__dirname, `../seeds/${filename}`),
      data,
      { flag: "w" },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${filename} saved!`);
          return `${filename} saved!`;
        }
      }
    );
  },
};
