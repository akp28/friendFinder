

var friends = require("../app/data/friends");
var tempArr = require("../app/data/tempArr");
// var waitListData = require("../data/waitinglistData");

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.get("/api/temp", function(req, res){
        res.json(tempArr);
    });
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
    // getSum function will give sum of the array .
    function getSum(total, num) {
          return total + num;
        }

    app.post("/api/friends", function(req, res) {
      // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
      // It will do this by sending out the value "true" have a table
      // req.body is available since we're using the body parsing middleware
        // pushes new submission into the friends array
        // friends.push(req.body);
        tempArr.push(req.body);
        var scoresArray = [];
        for (var i = 0; i < friends.length; i++){
        var scoresSum = 0;
        // scoresSum = friends[i].scores.reduce((a, b) => a + b, 0);
        scoresSum = friends[i].scores.reduce(getSum);
        scoresArray.push(scoresSum);
        }
        // console.log("ScoresArray" + scoresArray);
        // var tempScore = tempArr[0].scores.reduce((a, b) => a + b, 0);
        // this will give sum of friends scores in a array
        // friends[i].scores
        var newFriendScores = req.body.scores;
        // console.log("newFriendScore" + newFriendScores);
        newFriendScores = newFriendScores.map(Number);
        // console.log("newFriendScore" + newFriendScores);

        var tempScore = newFriendScores.reduce(getSum);
        //This will get the closest match of scores from Scores Array.
        var closest = scoresArray.reduce(function(prev, curr) {
            // Logic is similar to doing if else condition 
            return (Math.abs(curr - tempScore) < Math.abs(prev - tempScore) ? curr : prev);
          });
        // console.log("tempArr" + JSON.stringify(tempArr));
        // console.log("TempScore" + tempScore);
        // console.log("closest" + closest);
        // Getting the index of closest match
        var index = scoresArray.indexOf(closest);  
        // console.log ("index" + index);
        // console.log("friends name" + friends[index]);  
        var bestPal = friends[index];
        console.log("json" + JSON.stringify(bestPal));
        res.json(friends[index]);
        
        friends.push(req.body);
    });
  };