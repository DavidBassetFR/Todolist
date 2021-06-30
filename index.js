require('dotenv').config();
const cors = require('cors')
const multer = require('multer');
const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !

const express = require('express');
const router = require('./app/router');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use( bodyParser.none() );
app.use(express.static('app/public'));

app.use(express.urlencoded({ extended: true }));

app.use(router);


app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));