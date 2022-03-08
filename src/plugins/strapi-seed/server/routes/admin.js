module.exports = {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/read",
      handler: "fileController.read",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/write",
      handler: "fileController.write",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/content-types",
      handler: "myController.getContentTypes",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/seed",
      handler: "myController.seedModel",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/delete",
      handler: "myController.delete",
      config: {
        policies: [],
      },
    },
  ],
};
