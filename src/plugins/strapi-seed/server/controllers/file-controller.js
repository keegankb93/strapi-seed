"use strict";

module.exports = {
  write: async (ctx) => {
    ctx.body = await strapi
      .plugin("strapi-seed")
      .service("readWrite")
      .write(ctx.request.body);
  },

  read: async (ctx) => {
    return (ctx.body = await strapi
      .plugin("strapi-seed")
      .service("readWrite")
      .read(ctx.request.body));
  },
};
