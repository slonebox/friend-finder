var friendsArray = require("../data/friends.js");

module.exports = function (app) {

//Displays all the data input by previous users as a JSON
  app.get("/api/friends", function (req, res) {
    res.json(friendsArray);
  });

  app.post("/api/friends", function (req, res) {
    //Stores user inputs in a newobject, re-indexes user question scores as numbers
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: req.body.scores.map(x => parseFloat(x))
    };

    //Function defined to find a best match
    function bestMatch(obj, array) {
      //Empty variables to store best match and best score
      var allDifferences = [];

      //For loop that passes through each object in array of existing friends
      for (i = 0; i < array.length; i++) {

        var userScores = obj.scores;
        var existingScores = array[i].scores;
        var totalDifference =
          Math.abs(userScores[0] - existingScores[0]) +
          Math.abs(userScores[1] - existingScores[1]) +
          Math.abs(userScores[2] - existingScores[2]) +
          Math.abs(userScores[3] - existingScores[3]) +
          Math.abs(userScores[4] - existingScores[4]) +
          Math.abs(userScores[5] - existingScores[5]) +
          Math.abs(userScores[6] - existingScores[6]) +
          Math.abs(userScores[7] - existingScores[7]) +
          Math.abs(userScores[8] - existingScores[8]) +
          Math.abs(userScores[9] - existingScores[9]);

          allDifferences.push(totalDifference);
      };

      var bestScore = Math.min.apply(Math, allDifferences);
      var bestMatchIndex = allDifferences.indexOf(bestScore);

      return JSON.stringify(array[bestMatchIndex]);
    };

    //Function called to determine best match
    var theBestMatch = bestMatch(newFriend, friendsArray);

    //New user inputs pushed to array, Response returns the best match
    friendsArray.push(newFriend);
    res.status(200).json(theBestMatch);
    console.log(friendsArray);

    //Display a modal with the data from the best match
  });

};

