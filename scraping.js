require('dotenv').config();

var request = require('request');
var cheerio = require('cheerio');

var axios = require('axios');

function apiAddArticle(url, data){
    axios.post(url, data)
        .then(function () {
            console.log("Add successed");
        })
        .catch(function () {
            console.log("Add failed");
        });
}

request('https://thanhnien.vn/tin-tuc/covid-19.html', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        var api_secret = process.env.API_SECRET;

        $('.relative').find('.story').each((index, story) => {
            if (story) {
                var image = $(story).find('a').find('img').attr('data-src');
                var link = $(story).find('a').attr('href');
                var header = $(story).find('h2').find('.story__title').text();
                var meta = $(story).find('.meta').find('.timebox').text();
                var summary = $(story).find('.summary').find('div').text();

                apiAddArticle(api_secret, {
                    image,
                    link,
                    header,
                    meta,
                    summary
                });
            }
        })
    } else {
        console.log(error);
    }
});