module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/upload',
      handler: 'myController.upload',
      config: {
        policies: [],
      },
    },
  ]
}