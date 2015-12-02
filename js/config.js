var config = {};
config.twitter = {};
config.twilio = {};
config.cron = {};

// Cron job: https://github.com/ncb000gt/node-cron#usage-basic-cron-usage
// Every day at 7.30 am : '00 30 07 * * *'
// Every 10 seconds: (for debugging purposes) '*/10 * * * * *'
config.cron.tab = '00 30 07 * * *';
config.cron.timezone = 'America/Montreal';

// Fill in with your own!
config.twitter.CONSUMER_SECRET = "";
config.twitter.CONSUMER_KEY = "";
config.twilio.TWILIO_SID = "";
config.twilio.TWILIO_AUTH_TOKEN = "";
config.twilio.TWILIO_PHONE = "";
config.twilio.TO_PHONE = "";

module.exports = config;