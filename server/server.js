//Install express server
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/index')(app);


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);