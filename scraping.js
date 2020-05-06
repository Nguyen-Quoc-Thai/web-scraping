require('dotenv').config();

var request = require('request');
var cheerio = require('cheerio');

var axios = require('axios');

async function apiAddArticle(url, data){
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

        $('.relative').find('.story').each((i, el) => {
            if (el) {
                var image = $(el).find('a').find('img').attr('data-src');
                var header = $(el).find('h2').find('.story__title').text();
                var meta = $(el).find('.meta').find('.timebox').text();
                var summary = $(el).find('.summary').find('div').text();

                var data = {
                    image,
                    header,
                    meta,
                    summary
                };

                apiAddArticle(api_secret, data);
            }
        })
    } else {
        console.log(error);
    }
});