const path = require("path");

// Seed data

// Relation dependencies
//const features = require("./features.js");
//const images = require("./images.js");

// API
let api = "";

const self = (module.exports = {
  // Create integration
  create: async (data) => {
    // Create integration from data and its features.
    // Relations aren't available by default so we need to "Populate" the relation field for creation.
    data.publishedAt = Date.now();
    const createdItem = await strapi.entityService.create(api, {
      data: data,
    });

    // Find features that belong to the created item -- TODO: Potentially move this to features like images
    /*     const [...relatedFeatures] = await Promise.all(
      data.features.map(async (featureName) => {
        const feature = await features.findByName(featureName);
        return feature;
      })
    ); */

    /*     if (data.images) {
      const relatedImages = await images.create(data.images, data.name);
      await self.update(createdItem.id, "images", relatedImages);
    } */

    // Update item with it's relation
    //await self.update(createdItem.id, "features", relatedFeatures);
    // Log id's created
    return createdItem.id;
  },

  update: async (id, field, data) => {
    const fieldToUpdate = { data: {}, populate: ["features", "images"] };
    fieldToUpdate.data[field] = data;

    const updatedItem = await strapi.entityService.update(
      api,
      id,
      fieldToUpdate
    );
    return updatedItem;
  },

  // Loop through integration seed data and create an integration for each available
  seed: async (data) => {
    console.log(data.model, data.data);
    api = data.uid;
    const modelData = await JSON.parse(data.data);
    const modelItems = modelData[data.model];

    const seededModelItems = await Promise.all(
      modelItems.map(async (item) => {
        const seededModelItem = await self.create(item);
        return seededModelItem;
      })
    );

    console.log(
      seededModelItems,
      `\nCreated ${seededModelItems.length} ${data.model}:\n`
    );

    return { success: "Created ${seededModelItems.length} ${data.model}\n" };
  },
});
