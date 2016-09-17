const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/fcmp_prod',
  port: process.env.PORT || 8420,
  secret: 'dreamWEALTH!1FAST8z1poz',
};

module.exports = config;
