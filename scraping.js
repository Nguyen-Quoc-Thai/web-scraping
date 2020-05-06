var request = require('request');
var cheerio = require('cheerio');

var axios = require('axios');

request('https://thanhnien.vn/tin-tuc/covid-19.html', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.relative').find('.story').each((i, el) => {
            if (el) {
                var image = $(el).find('a').find('img').attr('data-src');
                var header = $(el).find('h2').find('.story__title').text();
                var meta = $(el).find('.meta').find('.timebox').text();
                var summary = $(el).find('.summary').find('div').text();

                axios.post(process.env.API_SECRET, {
                    image,
                    header,
                    meta,
                    summary
                })
                    .then(function () {
                        console.log("Add successed");
                    })
                    .catch(function () {
                        console.log("Add failed");
                    });
            }
        })
    } else {
        console.log(error);
    }
});