const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./build/webpack.dev.config');

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(cors());

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: 'http://localhost:' + port,
  hot: true,
  inline: true,
  lazy: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(Date());
    console.info(`==> 🌎  Serving index.html at http://localhost:${port}/`);
  }
});
