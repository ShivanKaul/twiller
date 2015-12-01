function parseDate(string) {
    var timestamp = new Date(string.toLocaleString());
    // get relevant pieces of timestamp and return
    return timestamp.toString().split(' ').slice(1, 5).join(' ');
}

exports.parse = function(body, callback) {
    var tweets = [];
    for (var i = 0; i < body.length; i++) {
    	// index)-[localTimestamp]-tweet
        tweets.push((i + 1) + ') ' + '[' + parseDate(body[i].created_at) + '] ' + body[i].text + '\n\n');
    }
    callback(tweets);
}
