const express = require('express');
const url = require('url');
const app = express();
const port = 3000;

const games = [
    { name: "Pokemon Emerald", file: "gba-pokemon-emerald-original.zip", path: "emerald" },
    { name: "Emerald Hack", file: "pokeemerald-5.zip", path: "hack" },
    { name: "Pokemon Unbound", file: "pokemon-unbound.zip", path: "unbound" },
    { name: "Pokemon Liquid Crystal", file: "gba-pokemon-liquid-crystal.zip", path: "liquidCrystal" },
    { name: "Advance Wars", file: "advance-wars.zip", path: "advanceWars" },
    { name: "Advance Wars 2 - Black Hole Rising", file: "advance-wars-2-black-hole-rising.zip", path: "advanceWars2" }
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { games });
});

app.get("/stable/*", (req, res) => {
    console.log(url.parse(req.url).path);
    res.sendFile(url.parse(req.url).path, { root: __dirname });
});

app.get("/roms/*", (req, res) => {
    console.log(url.parse(req.url).path);
    res.sendFile(url.parse(req.url).path, { root: __dirname });
});

games.forEach((game) => {
    app.get(`/${game.path}`, (req, res) => {
        res.render('emjs', { game });
    });
});

app.get((req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server listening on port " + port + "... ");
});