var request = require('request');

var consumer_key = ""
var consumer_secret = ""

var user = ""
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
                    console.log(body)
                }
            })
        } else {
            console.log(response.statusCode)
        }
    }
);
