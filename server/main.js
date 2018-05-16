import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan';        // HTTP REQUEST LOGGER
import bodyParser from 'body-parser';   // PARSE HTML BODY
import mongoose from 'mongoose';
import session from 'express-session';
import api from  './routes';

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
 * Middle ware
 */

app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on(error, console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/**
 * Dev server
 */

const devPort = 4000;

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

/* setup routers & static directory */
app.use('/api', api);
