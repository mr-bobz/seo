import SearchDispatcher from "../dispatchers/SearchDispatcher";

export function search(args){
    SearchDispatcher.dispatch({
        type: "SEARCH",
        args: args
    })
}