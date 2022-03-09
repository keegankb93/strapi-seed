module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "bd65568a48dc113d03c45b1c721678a9"),
  },
  watchIgnoreFiles: ["**/seeds/**"],
});
