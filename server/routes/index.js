const auth = require('../controllers/auth');
const users = require('./users');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('This is the root');
  });

  app.use('/api/users', users);
  app.post('/api/authenticate', auth.authenticate);
};
