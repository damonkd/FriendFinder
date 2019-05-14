// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  
  // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        //for debugging
        //console.log(friends[0].scores);
        //console.log(req.body.scores[0]);
        
        // number to compare to starts out higher than max possible ensuring first compare will be a match
        var compare = 60;
        // holds the index of the best match so far
        var matchIndex = 0;

        //outer loop goes through each friend index
        for (var j = 0; j < friends.length; j++) {
            //inner loop sums array at outer index with survey results
            var sum = 0;
            for (var i = 0; i < 10; i++) {
                sum += Math.abs((friends[j].scores[i] - req.body.scores[i]));
            }
            // checks if current index is a better match
            if (sum < compare) {
                compare = sum;
                matchIndex = j;

            }

        }
        //console.log(sum);
        
        //adds entered data to friend list
        friends.push(req.body);

        // sends back match
        res.json(friends[matchIndex]);
       


    });

  
};
