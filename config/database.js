module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "enter your mongodb host link here"),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 1),
        database: env("DATABASE_NAME", "enter db name here"),
        username: env("DATABASE_USERNAME", "enter db username"),
        password: env("DATABASE_PASSWORD", "etner db password"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});
