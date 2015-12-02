# twiller

Get someone's tweets texted to your phone on a daily basis. Uses Twilio and Twitter APIs. I personally use Heroku Scheduler to periodically run the scripts and send me the digest, but you can also set up a cron job like I have in this master branch. You can check out the other branch for info on how I used Heroku. 

### Use

You need to sign up for both the Twitter and Twilio APIs. From Twilio, you will get an SID, an Auth Token, and a phone number. From Twitter you will get a consumer key and a consumer secret. I set up a dummy config.js file which I use to read in these variables - please supplant them with your own. There's also a field for `TO_PHONE`, which the phone number you want the tweets to be texted to. In my case, it was my phone number.


Then run as:

```
node js/getTweets.js <Twitter handle you want to follow>
```
