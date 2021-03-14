module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "7c03e9ef473f5d864228170ee0718f5a"),
    },
    watchIgnoreFiles: ["**./frontend**"],
  },
});
