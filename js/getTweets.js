var request = require('request');
var fs = require('fs');
var parser = require('./parser');
var sender = require('./sendSMS');
var config = require('./config');

var CronJob = require('cron').CronJob;

var consumer_key = config.twitter.CONSUMER_KEY;
var consumer_secret = config.twitter.CONSUMER_SECRET;
// Read in twitter handle
var user = process.argv[2];

var concat = consumer_key + ":" + consumer_secret;
var based = new Buffer(concat).toString('base64');

// Get oauth token and get tweets
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
            if (error) {
                console.log('Error authenticating with Twitter.');
                process.exit(1);
            } else if (response.statusCode == 200) {
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
                    if (error) {
                        console.log('Error fetching tweets.');
                        console.log(error);
                    } else if (response.statusCode == 200) {
                        parser.parse(JSON.parse(body), sender.send);
                    } else {
                        console.log('Error fetching tweets. Got response:');
                        console.log(response.statusCode);
                        process.exit(1);
                    }
                })
            } else {
                console.log('Error authenticating with Twitter. Got response:');
                console.log(response.statusCode);
                process.exit(1);
            }
        }
    );
}

console.log("Beginning cron job...");

var job = new CronJob(config.cron.tab, function() {

        // Executed.
        console.log("Tick! At " + new Date().toLocaleString());
        start();

    }, null,
    true, /* Start the job right now */
    config.cron.timezone /* Time zone of this job. */
)
