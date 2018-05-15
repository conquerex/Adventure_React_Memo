import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
// import express from 'express';
// import path from 'path';

const devPort = 4000;

/**
 * Express Codes
 */
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello Memo app!');
});

app.listen(port, () => {
    console.log('This app is listening on port ', port);
});

/**
 * Dev server
 */

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on dev mode!!');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port ', devPort);
        }
    )
}