var request = require('request');
fs = require('fs');
var parser = require('./parser');


var consumer_key = process.env.CONSUMER_KEY;
var consumer_secret = process.env.CONSUMER_SECRET;
var user = process.argv[2];

var concat = consumer_key + ":" + consumer_secret;
var based = new Buffer(concat).toString('base64');

// POST and GET
request.post({
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + based,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'grant_type=client_credentials'
    },

    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var token = JSON.parse(body).access_token;

            // Got access token, get user's tweets
            request.get({
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                qs: {
                    screen_name: user
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }, function(error, resp, body) {
                if (!error && response.statusCode == 200) {
                    parser.parse(JSON.parse(body), function(data) {
                        return fs.writeFile("results.txt", data.join(''));
                    })
                }
            })
        } else {
            console.log(response.statusCode);
        }
    }
);
