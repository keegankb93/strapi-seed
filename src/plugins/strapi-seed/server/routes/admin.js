module.exports = {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/find-seed",
      handler: "myController.findSeed",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/upload",
      handler: "myController.upload",
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
  ],
};
