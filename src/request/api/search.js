import service from "..";
export function getSearchHot() {
    return service({
        method: 'GET',
        url: `/search/hot/detail`,
    })
}



export function getSearchSuggest(keyword) {
    return service({
        method: 'GET',
        url: `/search/suggest?keywords=${keyword}&type=mobile`,
    })
}

export function getSearchDefault() {
    return service({
        method: 'GET',
        url: `/search/default`,
    })
}

export function getSearchResult(keyword) {
    console.log(keyword)
    return service({
        method: 'GET',
        url: `/cloudsearch?keywords=${keyword}`,
    })
}