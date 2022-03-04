const fs = require("fs");
const path = require("path")
  
module.exports = {
  write: async (fileData) => {
    const {name, data} = fileData;

    await fs.writeFile(
      path.join(__dirname, `../seeds/${name}.json`),
      data,
      { flag: "w" },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`${name} saved!`);
          return `${name} saved!`
        }
      }
    );
  }
}
