import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import Express from 'express';

const app = new Express();
const port = 3333;

const compiler = webpack( config );
app.use( webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath,
} ) );

app.use( webpackHotMiddleware( compiler, {
  log: console.log,
} ) );

app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'index.html' ) );
} );

app.listen( port, ( error ) => {
  /* eslint-disable no-console */
  if ( error ) {
    console.error( error );
  } else {
    console.info(
      '🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port,
    );
  }
  /* eslint-enable no-console */
} );
