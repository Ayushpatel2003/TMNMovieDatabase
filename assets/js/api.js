const GitHubLink = "https://github.com/Ayushpatel2003/TMNMovieDatabase";
const ImageBaseURL = "https://raw.githubusercontent.com/Ayushpatel2003/TMNMovieDatabase/main/server/db/assets/";
const ApiBaseURL = "http://localhost:3000/";

function fetchDataFromServer(command, callback, optionalParam) {
    fetch(ApiBaseURL+command)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
}

function postDataToServer(command, body, callback) {
    fetch(ApiBaseURL+command, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((response) => response.json())
    .then((data) => callback(data));
}
