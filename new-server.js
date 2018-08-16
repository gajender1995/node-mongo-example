var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("customers", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.get('/show', (req, res) => {
    User.find({ address: "Highway 38" }, function(err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
});

app.get('/showAll', (req, res) => {
    User.find({}, function(err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
});


app.post("/add", (req, res) => {
    var myData = new User(req.body);
    console.log(req.body);
    myData.save(function(err, product) {
     if (err)

      res.send(err);

    res.json(product);
});

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});