var path = require("path");

module.exports = function(app) {

    //Route to Survey Page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
      });

    //Route to Home Page
    app.get("/", function (req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"))
    });

    //Default Route-->Sends user to Home Page
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    });
};