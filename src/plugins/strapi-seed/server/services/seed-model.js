const { read } = require("fs");
const path = require("path");
const file = require("./read-write");
const imageUpload = require("./images");
const inflection = require("inflection");

// API
let api = "";

const seedModel = {
  // Create item
  creationObjects: async (obj) => {
    const updateObject = {};
    const createObject = {};

    // Check if field contains images or relations
    // If so add them to the updateObject to be added after creation
    //
    // TODO: Check if given relation exists, if not return an error.
    for (let key in obj) {
      if (obj[key].images || obj[key].relations) {
        updateObject[key] = obj[key];
      } else {
        createObject[key] = obj[key];
        createObject.publishedAt = Date.now();
      }
    }

    return { updateObject, createObject };
  },

  create: async function (data) {
    const { updateObject, createObject } = await this.creationObjects(data);

    const createdItem = await strapi.entityService.create(api, {
      data: createObject,
    });

    // Find features that belong to the created item -- TODO: Potentially move this to features like images
    /*     const [...relatedFeatures] = await Promise.all(
      data.features.map(async (featureName) => {
        const feature = await features.findByName(featureName);
        return feature;
      })
    ); */

    if (Object.keys(updateObject).length > 0) {
      const updateFunctions = {
        imageFunction: async (images, field, itemName) => {
          const relatedItems = await imageUpload.create(images, itemName);
          await this.update(createdItem.id, field, relatedItems);
        },
        relationFunction: async (relation, items, findBy) => {
          const singularizedRelation = inflection.singularize(relation);
          const relationAPI = `api::${singularizedRelation}.${singularizedRelation}`;

          const [...relationItems] = await Promise.all(
            items.map(async (item) => {
              const filterObj = {};
              filterObj[findBy] = { $eq: item };
              const [relationItem] = await strapi.entityService.findMany(
                relationAPI,
                {
                  filters: filterObj,
                }
              );
              return relationItem;
            })
          );
          await this.update(createdItem.id, relation, relationItems);
        },
      };

      for (let key in updateObject) {
        if (updateObject[key]["images"]) {
          updateFunctions.imageFunction(
            updateObject[key]["images"],
            key,
            `test-${createdItem.id}`
          );
        }

        if (updateObject[key]["relations"]) {
          updateFunctions.relationFunction(
            key,
            updateObject[key]["relations"],
            "name"
          );
        }
      }
    }

    // Update item with it's relation
    //await self.update(createdItem.id, "features", relatedFeatures);
    // Log id's created
    return createdItem.id;
  },

  update: async function (id, field, data) {
    const fieldToUpdate = { data: {}, populate: field };
    fieldToUpdate.data[field] = data;

    const updatedItem = await strapi.entityService.update(
      api,
      id,
      fieldToUpdate
    );
    return updatedItem;
  },

  delete: async function (data) {
    api = data.uid;
    const res = await file.read({ filename: "seeded-model-items.json" });
    const fileData = await JSON.parse(res);

    try {
      if (!fileData[api]) {
        throw new Error("Seed items not found, please seed this model first.");
      }
    } catch (e) {
      return { error: { message: e.message } };
    }

    let deletedItems = [];

    try {
      deletedItems = await Promise.all(
        fileData[api].map(async (id) => {
          const deletedItem = await strapi.entityService.delete(api, id);
          return deletedItem;
        })
      );
    } catch (e) {
      return { error: e };
    }

    delete fileData[api];

    file.write({
      filename: "seeded-model-items.json",
      fileData: JSON.stringify(fileData, null, 2),
    });
    return { success: `${deletedItems.length} items deleted.` };
  },
  // Loop through integration seed data and create an integration for each available
  seed: async function (data) {
    api = data.uid;
    const modelData = await JSON.parse(data.data);
    const modelItems = modelData[data.model];

    // Loop through each item in the model and wait for each to be created

    const seededModelItems = await Promise.all(
      modelItems.map(async (item) => {
        try {
          const seededModelItem = await this.create(item);
          return seededModelItem;
        } catch (e) {
          return { error: e };
        }
      })
    );

    // Store which items we created, so that we can delete them later
    const res = await file.read({ filename: "seeded-model-items.json" });
    const fileData = await JSON.parse(res);
    fileData[api] = seededModelItems;
    file.write({
      filename: "seeded-model-items.json",
      fileData: JSON.stringify(fileData, null, 2),
    });

    // Log information to server
    console.log(
      seededModelItems,
      `\nCreated ${seededModelItems.length} ${data.model}:\n`
    );

    // Return success message to client
    return { success: `Created ${seededModelItems.length} ${data.model}` };
  },
};

module.exports = seedModel;
