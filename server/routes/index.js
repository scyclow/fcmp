const user = require('./user');

module.exports = (app) => {
  app.use('/api/user', user);

  app.get('/', (req, res) => {
    res.send('This is the root');
  });
};
