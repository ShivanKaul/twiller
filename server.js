var request = require('request');
var fs = require('fs');
var parser = require('./parser');
var sender = require('./sendSMS');

var CronJob = require('cron').CronJob;

var consumer_key = process.env.CONSUMER_KEY;
var consumer_secret = process.env.CONSUMER_SECRET;
var user = process.env.USER;

var concat = consumer_key + ":" + consumer_secret;
var based = new Buffer(concat).toString('base64');

// POST and GET
function start() {
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
                        parser.parse(JSON.parse(body), sender.send);
                    }
                })
            } else {
                console.log(response.statusCode);
            }
        }
    );
}

console.log("Beginning cron job...");

var job = new CronJob('00 30 07 * * *', function() {

        // '*/10 * * * * *' -> every 10 seconds

        // '00 30 07 * * *' -> every morning @ 7: 30
        console.log("tick!");

        start();

        /*
         * Runs every day at 10.30 pm
         */

    }, null,
    true, /* Start the job right now */
    'America/Montreal' /* Time zone of this job. */
)
