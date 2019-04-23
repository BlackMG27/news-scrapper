//setup the variables 
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');
//initialize Express
var app = express();
//get the models
var db = require('./models');
//set up localhost port
var PORT = 3010;
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
//setting up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//setting up json
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/techScraper", {
    useNewUrlParser: true
});

//----------ROUTES-----------

require('./routes/apiRoutes')(app);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
})