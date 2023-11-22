"use strict";

const api_key = "829a43a98259bc44cae297489c7e3bba";
const imageBaseURL = "https://image.tmdb.org/t/p/";

// Fetch data from a server using the 'url' and pass the result in JSON data to a 'callback' function along with an optional parameter if has 'optionalParam'


const fetchDataFromServer = function (command, callback, optionalParam) {
    const url = "http://localhost:3000/";
    fetch(url+command)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

const postDataToServer = function (command, body, callback) {
    const url = "http://localhost:3000/";
    fetch(url+command, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((response) => response.json())
    .then((data) => callback(data));
};

export { imageBaseURL, api_key, fetchDataFromServer, postDataToServer };
