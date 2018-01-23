const download = require('download');

const util = {};

util.downloadPost = function (url, name, folder) {
    download(url, folder, {filename: name + '.jpg'});
}

util.downloadPosts = function (posts, folder) {
    posts.forEach((post, i) => {
        util.downloadPost(post, i, folder);
    });
}

util.downloadPostsApi = function (posts, folder) {
    posts.forEach((post, i) => {
        util.downloadPost(post.url, i, folder);
    });
}

module.exports = util;