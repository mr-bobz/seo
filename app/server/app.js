/*
    APIs & webserver setup
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import scraper from './scraper';


const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

app.use(publicPath);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(indexPath);
})

/*app.get('*', function (req, res) {
    var p = req.path.replace(/^\//, '').replace(/\/$/, '');
    if (p && p.endsWith('.js')) {
        var options = { headers: { 'content-type': 'application/javascript' } };
        res.sendFile(path.join(__dirname, '../', p), options);
    } else
        res.sendFile(path.join(__dirname, '../', 'index.html'));
});*/

app.post('/api/scrape', function (req, res) {
    console.log("req.body:", req.body);
    scraper.scrape(req.body.keywords, req.body.url)
        .then(
            results => {
                console.log("~~~~~~~~~~~~~~~ POST results: ~~~~~~~~~~~~~~~~~");
                console.log(results);
                res.json(results)
            },
            err => res.status(500).send(err)
        );
}
);

export default app;
