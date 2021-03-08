module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'test-cluster.ok0f6.mongodb.net'),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', 1),
        database: env('DATABASE_NAME', 'strapi_nextjs_blog'),
        username: env('DATABASE_USERNAME', 'ahmadbenos'),
        password: env('DATABASE_PASSWORD', 'va3MZDbTERqMEsjh'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
