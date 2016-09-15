const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/fcmp_test',
  port: process.env.PORT || 8422,
};

module.exports = config;
