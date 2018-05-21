import {EventEmitter} from "events";
import SearchDispatcher from "../dispatchers/SearchDispatcher";

class SearchStore extends EventEmitter{

    constructor(){
        super();
        this.results = [];
        this.trends = [];
    }

    getTrends(){
        return this.trends;
    }

    getResults(){
        return this.results;
    }

    search(args){
        //fetch config    
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: args.keywords,
                url: args.url
            })
        };

        //call NodeJS API for web scraping    
        fetch('/api/scrape', options)
            .then(resp => resp.json())
                .then(data => {
                    // code for handling the data from the API
                    console.log("fetch succesful, data:", data);
                    let positions = "";
                    if (data && data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            if (i > 0) {
                                positions += ", " + data[i].position;
                            } else positions += data[i].position;
                        }
                    }
                    this.trends.push({
                        id: Date.now() + "", //rowId for table
                        date: new Date().toLocaleString(),
                        positions: positions,
                        url: args.url,
                        keywords: args.keywords
                    })
                    //console.debug("this.trends:",this.trends);
                    this.results = data;
                    this.emit("Search_Complete");
                }).catch(function (err) {
                    // if the server returns any errors
                    console.error(err);
                });        
    }

    handleActions(action){
        console.log("SearchStore received an action:", action);
        switch(action.type){
            case "SEARCH":{
                this.search(action.args)
            }
        }
    }

}

const searchStore = new SearchStore;
SearchDispatcher.register(searchStore.handleActions.bind(searchStore));
export default searchStore;