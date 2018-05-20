/*
    Basic class to abstract server, Controller
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/

class SearchAPI {

    constructor(props) {
    }

    search(keywords, url){
        //fetch config    
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
                url: url
            })
        };

        //call NodeJS API for web scraping    
        return fetch('/api/scrape', options);            
    }
}

const instance = new SearchAPI();
export default instance;