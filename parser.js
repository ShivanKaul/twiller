function parseDate(string) {
    var timestamp = new Date(string.toLocaleString());
    // get relevant pieces of timestamp and return
    return timestamp.toString().split(' ').slice(1, 5).join(' ');
}

exports.parse = function(body, callback) {
    var tweets = [];
    // NOTE: only getting last 10 tweets. More useful would be all tweets since last time,
    // but Twilio has limit of characters. The followed user might be very active on Twitter.
    // This would crash the server.
    // I can think of a more intelligent way to do it, but it's annoying, and I don't really
    // care right now.
    for (var i = 0; i < body.length / 2; i++) {
    	// index)-[localTimestamp]-tweet
        tweets.push('\n' + (i + 1) + ') ' + '[' + parseDate(body[i].created_at) + '] ' + body[i].text + '\n');
    }
    callback(tweets);
}
