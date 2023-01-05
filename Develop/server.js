const fs = require('fs');
const express = require('express');

const PORT = 3001;
const app = express();
const path = require('path');
const noteData = require ("./db/db.json");
const uuid = require('./uuid')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(
      noteData,
  );
});

app.post('/api/notes', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);
  // Destructuring assignment for the items in req.body
  const { text, title } = req.body;

    const newNoteObject = {
      text,
      title,
      id: uuid(),
    };

  // Log our request to the terminal
  console.info(`${req.method} request received`);
  console.info(newNoteObject);
  noteData.push(newNoteObject);
  fs.writeFileSync("./db/db.json",JSON.stringify(noteData));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);