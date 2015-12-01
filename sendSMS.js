var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var fromPhone = process.env.TWILIO_PHONE;
var toPhone = process.env.TO_PHONE;

var client = require('twilio')(accountSid, authToken);

exports.send = function(body) {
    var body = body.join('');
    client.messages.create({
        body: body,
        to: toPhone,
        from: fromPhone
    }, function(err, message) {
        if (error) {
        	// Crash and burn, baby
            console.log(err);
            process.exit(1);
        }
        // else {
        //     console.log(message);
        // }
    });
}
