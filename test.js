
require('dotenv').config();

const express = require('express');
const { Carte, Liste, Label } = require('./app/models');


const PORT = process.env.PORT || 3000;

const app = express();

async function log () {
const caca = await Carte.findByPk(1, {
    include : "labels"
})
console.log(caca.labels[1].name);
}

log();

app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));

