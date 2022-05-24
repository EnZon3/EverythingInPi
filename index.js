const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

// middleware
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

module.exports = app;