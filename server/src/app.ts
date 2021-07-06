/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './category/router';
import items from './item/router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const publicPath = path.resolve(__dirname, '../wwwroot');
const indexPath = path.resolve(__dirname, '../wwwroot/index.html');

// if query not starts with '/api/' string - send file from wwwroot
app.use(/^(?!\/api\/)/, express.static(publicPath));
// if file doesn't exists - send index.html
app.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});
app.use('/api/categories', categories);
app.use('/api/items', items);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
