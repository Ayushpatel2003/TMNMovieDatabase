// Add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};

// Toggle Search box in mobile device || small screen

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
});

// store movieId in 'localStorage' when you click any movie card

const getMovieDetail = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
};

const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
};


function getUserProfile(){
    const userId = window.localStorage.getItem("UserId");
    if (userId == undefined)return userId;

    fetchDataFromServer(
        `user?user_id=${userId}`,
        function ({data}){
            const user = data[0];
            const signin = document.getElementById("SignInButton");
            signin.innerHTML = user.username;
            signin.href = "./user_profile.html"
        }
    );

    return userId;
}
