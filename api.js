const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8088;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/code', (req, res) => {
    var country = req.query.country;
    country = country.toLowerCase();
    fs.readFile('countries.json', 'utf8', (err, jsonFile) => {
        const arr = JSON.parse(jsonFile);
        var len = arr.length;
        for(let i = 0; i < len; i++) {
            var text = arr[i].name;
            text = text.toLowerCase();
            if(text === country) {
                res.send(arr[i].iso3);
                return;
            }
        }
        res.send("No such Country exists!");
    });
});

app.listen(PORT, () => console.log('App running on port ${PORT}'));