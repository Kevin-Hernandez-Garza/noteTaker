// require node.js API built-in modules 
const express = require('express');
const fs = require('fs');
const path = require('path');
const {nanoid} = require('nanoid');
// environment variable 
const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();
// middleware function to also look for other files in the public folder
app.use(express.static('public'));
// parse incoming string or array data = middleware function
// takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
// the extended:true informs server that there maybe subarray data and it should look deep into the POST data to parse it all correctly
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data = middleware function
// takes incoming POST data in the form of JSON and parses it into the req.body JS Object. 
app.use(express.json());
// requiring the db data 
const {notes} = require('./db/db.json');


// writing to our db.json file 
function createNewNote(body, notesArray) {
    // console.log(body);

    const note = body;
    // giving each note a unique id
    note.id = nanoid()
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    // return finished code to post route for response
    // return body;
    return note;
}

// validating the user input is correct
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

//adding the get route
app.get('/api/notes', (req,res) => {
    //the res.send method is used to send short messages
    // if we wanted to send big json data we would use the res.json method
    res.json(notes);
});

// post request
app.post('/api/notes', (req,res) => {
    // req.body is where our incoming content will be 
    // adding id to array lesson 11.2.6

    if(!validateNote(req.body)) {
        res.status(400).send('The note was not properly submitted!');
    } else {
        // adding note to json file
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// route to the index.html file 
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// make the server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});