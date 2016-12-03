const auth = require('../controllers/auth');
const users = require('./users');
const accounts = require('./accounts');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('This is the root');
  });

  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
  app.post('/api/authenticate', auth.authenticate);
};
