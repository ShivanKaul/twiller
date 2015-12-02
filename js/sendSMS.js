var config = require('./config');

var accountSid = config.twilio.TWILIO_SID;
var authToken = config.twilio.TWILIO_AUTH_TOKEN;
var fromPhone = config.twilio.TWILIO_PHONE;
var toPhone = config.twilio.TO_PHONE;

var client = require('twilio')(accountSid, authToken);

exports.send = function(body) {
    var body = body.join('');
    if (body) {
        client.messages.create({
            body: body,
            to: toPhone,
            from: fromPhone
        }, function(err, message) {
            if (err) {
                // Crash and burn, baby
                console.log('Error sending text. Got ');
                console.log(err);
                process.exit(1);
            }
        });
    } else {
        console.log('Body of text to send is malformed. It is:');
        console.log(body);
        process.exit(1);
    }
}
