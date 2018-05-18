import { resolve } from 'dns';
import { rejects } from 'assert';

const rp = require('request-promise');
const cheerio = require('cheerio');
const uri = `https://www.google.com/search?num=100&q=`;

const options = {
    uri: uri,
    transform: function (body) {
        return cheerio.load(body);
    }
};

const scraper = {};

scraper.scrape = function (keywords, url) {
    console.log("scraper.scrape():",keywords);
    return new Promise((resolve, reject) => {
        options.uri = uri; //reset
        console.log("options.uri:",options.uri);
        options.uri = options.uri + keywords;
        console.log("Search URL:",options.uri);
        let results = [];
        let urlFound;
        let index=0;
        rp(options)
            .then(($) => {
                //console.log($);
                //console.log($('html').html());
                //console.log($('#ires ol').html());
                $('#ires ol').children('div').each(function(i, elem){ 
                    console.log("------------------------- ELEMENT -------------------------");                   
                    console.log($(this).html());
                    //console.log(elem.outerHTML);
                    urlFound = $(this).find(".r").children('a').attr('href');
                    if(urlFound)
                        urlFound = urlFound.replace("/url?q=","");                    
                    console.log('urlFound:',urlFound);
                    index++;
                    console.log('index:',index);
                    if(urlFound && urlFound.includes(url))
                        results.push({
                            title:  $(this).find(".r").children('a').text(),
                            url: urlFound,
                            summary: $(this).find(".st").html(),
                            position: index
                        });                   
                });
                console.log("scraper: results:",results);
                resolve(results);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        
    });
}

export default scraper;