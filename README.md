# twitter-plus-email

Get someone's tweets delivered to your email on a daily basis. 

### Development

You must set your own CONSUMER_KEY and CONSUMER_SECRET (you can get them when you sign up for a Twitter developer account - I think you may have to create an application). Set them as:

```
export CONSUMER_KEY="<insert your consumer key>"
```
Similarly for CONSUMER_SECRET.

Then run as:

```
node server.js <Twitter handle of person you want to follow>
```
