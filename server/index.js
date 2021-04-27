const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const db = require('./db');
const { reset } = require('nodemon');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(pino);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/api/post/bid"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Connect
db.database.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.get('/api/item/:id', async (req, res, next) => {
    let sql = `SELECT * FROM item WHERE item_id = ${req.params.id}`;
    let query = db.database.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);   
        res.send(results);
    });
});

app.get('/api/allitems', async (req, res, next) => {
    let sql = 'SELECT * FROM item';
    let query = db.database.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);   
        res.send(results);
    });
});

app.post('/api/post/bid', bodyParser.json(), async (req, res) => {
    console.log("BREAEAAAK");
    console.log(req.body);
    console.log("BREAEAAAK2");
    let sql = `INSERT INTO bid (bidder_name, bidder_contact_info, bid_item_id, bid_price) VALUES (?, ?, ?, ?)`;
    let query = db.database.query(sql, [
        req.body.bidder_name, req.body.bidder_contact_info, req.body.bid_item_id, req.body.bid_price
    ], (err, results) => {
        if(err) throw err;  
        console.log(err);
         console.log(results);
        res.send(results);
    });
  });

  app.get('/api/images/:id', async (req, res, next) => {
    let sql = `SELECT * FROM image WHERE item_id = ${req.params.id}`;
    let query = db.database.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);   
        res.send(results);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
