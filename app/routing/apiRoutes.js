var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var submit = req.body;
        var ally = {};

        for (var i = 0; i < submit.scores.length; i++) {
            if (submit.scores[i] == "1 (Strongly Disagree)") {
                submit.scores[i] = 1;
            } else if (submit.scores[i] == "5 (Strongly Agree)") {
                submit.scores[i] = 5;
            } else {
                submit.scores[i] = parseInt(submit.scores[i]);
            }
        }

        // I'm afraid I had to indulge in quite a bit of sample code to get through this next part. 
        // Realisitically, I probably copied too much to receive credit here.
        // Though, for what it's worth, I did study the code and tinker with it after the fact.   

        var bookmark = 0;

        // The sample code I used had an essential comment here.
        // It noted that the maximum different per question is 4 (since the lowest # the user can enter is 1 and the highest # is 5).
        // Therefore, this variable should be [Max Diff] * [# of Questions]. 
        // 40.
        // I would not have figured this out on my own...not quickly enough, at least.  
        var maxDiff = 40;

        // Now we're back in "dueling for loop" territory.
        // Didn't need quite as much guidance here. 
        // (I'd also previously looked up "Math.abs" as per the hw instructions, so no problem there). 
        for (var i = 0; i < friends.length; i++) {
            var diff = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                var subtract = Math.abs(friends[i].scores[j] - submit.scores[j]);
                diff += subtract;
            }

            if (diff < maxDiff) {
                bookmark = i;
                maxDiff = diff;
            }
        }

        ally = friends[bookmark];

        friends.push(submit);

        res.json(ally);
    });

};