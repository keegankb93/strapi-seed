"use strict";

module.exports = {
  index: (ctx) => {
    ctx.body = strapi
      .plugin("strapi-seed")
      .service("myService")
      .getWelcomeMessage();
  },

  getContentTypes: async (ctx) => {
    return (ctx.body = await strapi
      .plugin("strapi-seed")
      .service("contentTypes")
      .getContentTypes());
  },

  seedModel: async (ctx) => {
    return (ctx.body = await strapi
      .plugin("strapi-seed")
      .service("seedModel")
      .seed(ctx.request.body));
  },
  delete: async (ctx) => {
    return (ctx.body = await strapi
      .plugin("strapi-seed")
      .service("seedModel")
      .delete(ctx.request.body));
  },
};
