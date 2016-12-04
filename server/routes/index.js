const auth = require('../controllers/auth');
const users = require('./users');
const accounts = require('./accounts');
const transfers = require('./transfers');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('This is the root');
  });

  app.post('/api/authenticate', auth.authenticate);

  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
  app.use('/api/transfers', transfers);
};
