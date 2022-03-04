'use strict';

module.exports = {
  index: (ctx) => {
    ctx.body = strapi
      .plugin('strapi-seed')
      .service('myService')
      .getWelcomeMessage();
  },

  upload: (ctx) => {
    ctx.body = strapi.plugin('strapi-seed').service('writeFile').write(ctx.request.body)
  }
};
