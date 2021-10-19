// require the express.js module 
const express = require('express');
// instantiate the server
const app = express();
// requiring the db data 
const {db} = require('./db/db.json');





//adding the get route
app.get('/api/db', (req,res) => {
    res.send('Hello World');
});

// make the server listen 
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});