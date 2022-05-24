const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.listen(port);
console.log('Server started at http://localhost:' + port);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

module.exports = app;