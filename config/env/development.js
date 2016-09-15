const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/fcmp_dev',
  port: process.env.PORT || 8421,
};

module.exports = config;
