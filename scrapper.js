const rp = require('request-promise');
const cheerio = require('cheerio');
const util = require('./util.js');

class Scrapper {

    constructor() {

    }

    async scrap() {
        let cozy = [];
        let notCozy = [];

        const options = {
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        // First URI call
        options.uri = 'https://www.reddit.com/r/CozyPlaces?limit=100'
        for (let index = 0; index < 100; index++) {
            console.log('Scrapping page = ' + index);

            let $ = await rp(options);

            let posts = $('#siteTable').contents();
            // Clasiffy posts
            posts.each((i, element) => {
                let score = $(element).attr('data-score');
                let image = $(element).attr('data-url');
                if (image) {
                    if (score > 1000) {
                        cozy.push(image);
                    }
                    else if (score < 15) {
                        notCozy.push(image);
                    }
                }
            });

            // Go to next page
            options.uri = $('.next-button').contents().attr('href');
        }

        // Download images
        console.log('Downloading Images');
        util.downloadPosts(cozy, './pictures/cozy/');
        util.downloadPosts(notCozy, './pictures/notcozy/');

        console.log('Done! ');
        console.log('---------------------------');
        console.log('Total cozy = ' + cozy.length);
        console.log('Total notCozy = ' + notCozy.length);
    }
}

module.exports = Scrapper;
