
exports.parse = function(body, callback) {
	var tweets = [];
    for (var i = 0; i < body.length; i++) {
    	tweets.push(body[i].text + '\n\n');
    }
    callback(tweets);
}
