# twiller

Get someone's tweets texted to your phone on a daily basis. Uses Twilio and the Twitter API.

### Development

I use environment variables for secrets and auth tokens and whatnot. You must set your own Twitter CONSUMER_KEY and CONSUMER_SECRET (you can get them when you sign up for a Twitter developer account - I think you may have to create an application). You will also have to sign up for a Twilio account and get an Account SID and Auth Token and phone number. 


```
export CONSUMER_SECRET="<insert your consumer secret>"
export CONSUMER_KEY="<insert your consumer key>"
export TWILIO_SID="<insert your sid>"
export TWILIO_AUTH_TOKEN="<insert your auth token>"
export TWILIO_PHONE="<insert your twilio phone>"
export TO_PHONE="<insert your own phone number>"
```


Then run as:

```
node server.js <Twitter handle of person you want to follow>
```
