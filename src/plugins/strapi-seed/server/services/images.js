const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const _ = require("lodash");

// Image APIs
const uploadApi = "plugin::upload.upload";

const images = {
  filepath: function (filename) {
    return path.join(__dirname, `../tmp/${filename}`);
  },

  fetch: async function (url) {
    //const filename = name;
    //const ext = path.extname(filename);
    const res = await fetch(url);
    const body = await res.body;
    return body;
  },

  write: async function (url, filename) {
    const filepath = this.filepath(filename);
    const writeStream = fs.createWriteStream(filepath);
    const readableStream = await this.fetch(url);

    const file = await new Promise(async (resolve) => {
      await readableStream.pipe(writeStream);
      writeStream.on("finish", () => {
        writeStream.close(resolve);
      });
    });
    return file;
  },

  removeTmpFiles: function () {
    fs.readdirSync(path.join(__dirname, "../tmp"), {
      withFileTypes: true,
    }).forEach((file) => {
      fs.unlinkSync(this.filepath(file.name));
    });
  },

  create: async function (images, imageName) {
    // Fetches and writes a tmp file returning a File object for Strapi's upload
    const [...filepaths] = await Promise.all(
      await images.map(async (image, idx) => {
        const ext = path.extname(image);
        const mimeType = ext.split(".").slice(-1).join("");
        const filename = `${imageName}-${idx}${ext}`;
        await this.write(image, filename);
        return {
          path: this.filepath(filename),
          type: `image/${mimeType}`,
          name: filename,
        };
      })
    );

    const createdItem = await strapi.service(uploadApi).upload({
      data: {},
      files: filepaths,
    });

    this.removeTmpFiles();

    return createdItem;
  },
};

module.exports = images;
