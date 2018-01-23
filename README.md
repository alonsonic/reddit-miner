Reddit Miner
Author: Alonso Araujo

Before running add Reddit's api keys by creating a file 'keys.js' in root with the following JSON object

```js
const keys = {
    access_token: 'TOKEN',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'TOKEN',
    scope: 'read',
    client_id: 'ID',
    client_secret: 'SECRET',
    user_agent: 'AGENT'
};

module.exports = keys;
```

There are two miners in this project:

- Web Scrapper built with Cheerios
- API Miner built with Snoowrap

The API miner allows you to mine the most recent posts as well as the complete history of a subreddit.

At the moment the miner is minning the CozyPlaces subreddit for pictures. I used this to build a quick and dirty ML classifier.

Feel free to adapt the miner to your needs.