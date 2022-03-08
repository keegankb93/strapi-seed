const fs = require("fs");
const path = require("path");

module.exports = {
  // Try to read the passed filename, return an error if it doesn't exist.
  read: async (req) => {
    const { filename } = req;
    try {
      const fileData = fs.readFileSync(
        path.join(__dirname, `../seeds/${filename}`),
        "utf8"
      );
      return fileData;
    } catch (e) {
      console.log(
        `File @ ${e.path} not found. You most likely have not created the file yet.`
      );
      return { error: e };
    }
  },

  // Try to write to a file.
  // If the file doesn't exist, create it.
  // If filedata type is malformed i.e. undefined etc. return an error
  write: async (data) => {
    const { filename, fileData } = data;
    try {
      await fs.promises.writeFile(
        path.join(__dirname, `../seeds/${filename}`),
        fileData,
        {
          flag: "w",
        }
      );
      return { success: "Seed data saved successfully." };
    } catch (e) {
      return { error: e };
    }
  },
};
