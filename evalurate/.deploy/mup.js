module.exports = {
  servers: {
    one: {
      host: '192.241.203.179',
      username: 'root',
      password: '61289eb2e7dfc30d',
      // pem: './mykey',
    },
  },

  meteor: {
    name: 'Evalurate',
    path: '../',
    servers: {
      one: {},
    },
    env: {
      ROOT_URL: 'http://evalurate.co',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 120, //default 10
  },
  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
