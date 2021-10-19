// require the express.js module 
const express = require('express');
// instantiate the server
const app = express();
// environment variable 
const PORT = process.env.PORT || 3001;
// requiring the db data 
const {notes} = require('./db/db.json');





//adding the get route
app.get('/api/notes', (req,res) => {
    //the res.send method is used to send short messages
    // if we wanted to send big json data we would use the res.json method
    res.json(notes);
});

// make the server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});