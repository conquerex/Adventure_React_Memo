import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello Memo app!');
});

app.listen(port, () => {
    console.log('This app listening on port ', port);
});