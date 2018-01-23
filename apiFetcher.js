const snoowrap = require('snoowrap');
const keys = require('./keys.js');
const util = require('./util.js');
const moment = require('moment');

class ApiFetcher { 

    constructor () {
        // Create a new snoowrap requester with OAuth credentials.
        this.r = new snoowrap({
            userAgent: keys.user_agent,
            clientId: keys.client_id,
            clientSecret: keys.client_secret,
            refreshToken: keys.refresh_token
        });
    }
    
    // Fetch Posts from reddit and classify them.
    // Cozy = 1000+ votes
    // Not so cozy = 0-10 votes
    async fetchPosts () {
        let after = '';
        let count = 0;
        let cozyPost = [];
        let notCozyPost = [];
        console.log('--- Starting Reddit Minning --')

        //Fetch X pages of posts
        const fetchPages = 10;
        for (let i = 0; i < fetchPages; i++) {
            console.log('Fetching Page: ' + i + ' Count: ' + count);
            let posts = await this.r.getNew('CozyPlaces', { 'limit': 100, 'after': after, 'count': count });

            //Classify posts
            posts.forEach((post) => {
                if (post.score > 1000 && post.post_hint == 'image') {
                    cozyPost.push(post);
                }
                if (post.score > 0 && post.score < 10 && post.post_hint == 'image') {
                    notCozyPost.push(post);
                }
            });
            count = posts.length;
            after = posts._query.after;
        }
        console.log('--- Reddit Minning Done ---');
        console.log('Cozy places = ' + cozyPost.length);
        console.log('Not so cozy places = ' + notCozyPost.length);

        // Download pictures
        console.log('--- Downloading Cozy/NotCozy Pictures ---');
        cozyPost.forEach(downloadPost('./pictures/cozy/'));
        notCozyPost.forEach(downloadPost('./pictures/notcozy/'));
        console.log('--- Done ---');
    }

    // Fetch Posts from reddit and classify them.
    // Cozy = 1000+ votes
    // Not so cozy = 0-10 votes
    async cloudSearch () {
        let cozy = [];
        let notCozy = [];
        console.log('--- Starting Reddit Minning --')

        //Search parameters
        const fetchPages = 30;
        let from = moment().subtract(2, 'weeks');
        let to = moment();

        for (let i = 0; i < fetchPages; i++) {
            const format = 'dddd, MMMM Do YYYY';
            console.log('Fetching Number: ' + i);
            console.log('From' + from.format(format) + ' to ' + to.format(format));

            const options = {
                query: 'timestamp:' + from.format('X') + '..' + to.format('X'),
                subreddit: 'CozyPlaces',
                syntax: 'cloudsearch',
                limit: 1000
            };
            let posts = await this.r.search(options);

            //Classify posts
            posts.forEach((post) => {
                if (post.score > 1000 && post.post_hint == 'image') {
                    cozy.push(post);
                }
                if (post.score > 0 && post.score < 20 && post.post_hint == 'image') {
                    notCozy.push(post);
                }
            });

            // Update dates for next fetch
            from = from.subtract(2, 'weeks');
            to = to.subtract(2, 'weeks');
        }
        console.log('--- Reddit Minning Done ---');
        console.log('Cozy places = ' + cozy.length);
        console.log('Not so cozy places = ' + notCozy.length);

        // Download pictures
        console.log('--- Downloading Cozy/NotCozy Pictures ---');

        util.downloadPostsApi(cozy, './pictures/cozy/');
        util.downloadPostsApi(notCozy, './pictures/notcozy/');
        console.log('--- Done ---');
    }

}

module.exports = ApiFetcher;