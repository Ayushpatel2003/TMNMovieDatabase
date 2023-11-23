const pageContent = document.querySelector("[page-content]");
const movieId = window.localStorage.getItem("movieId");

sidebar();
const userId = getUserProfile();


postDataToServer(
    "insertrecent", JSON.stringify({ user_id: userId, movie_id: movieId }),
    (data) => {
        console.log(data);
    }
);



function getGenres(genreList) {
    const newGenreList = [];
    for (var i=0; i<genreList.length; ++i){
        newGenreList.push(genreList[i].genre_name);
    }
    return newGenreList.join(", ");
};

function getCasts(castList) {
    const newCastList = [];
    for (let i = 0, len = castList.length; i < len && len && i < 10; i++) {
        newCastList.push(castList[i].fname + " " + castList[i].lname);
    }
    return newCastList.join(", ");
};

function getDirectors(directorList) {
    const newDirectorList = [];
    for (var i=0; i<directorList.length; ++i){
        newDirectorList.push(directorList[i].fname + " " + directorList[i].lname);
    }
    return newDirectorList.join(", ");
};

// returns only trailers and teasers as array
function filterVideos(videoList) {
    return videoList.filter(
        ({ type, site }) =>
        (type === "Trailer" || type === "Teaser") && site === "Youtube"
    );
};


fetchDataFromServer(
    `moviedetail?movie_id=${movieId}`,
    function ({moviedata, castdata, directorsdata, genredata}) {
        const movie = moviedata[0];
        document.title = `${movie.title} - TMN`;

        const movieDetail = document.createElement("div");
        movieDetail.classList.add("movie-detail");
        movieDetail.innerHTML = `
        <div
        class="backdrop-image"
        style="background-image: url('${ImageBaseURL}${movie.backdrop_id || movie.poster_id}')">
        </div>

        <figure class="poster-box movie-poster">
        <img
        src="${ImageBaseURL}${movie.poster_id}"
        alt="${movie.title} poster"
        class="img-cover"
        />
        </figure>

        <div class="detail-box">
        <div class="detail-content">
        <h1 class="heading">${movie.title}</h1>

        <div class="meta-list">
        <div class="meta-item">
        <img
        src="./assets/images/star.png"
        width="20"
        height="20"
        alt="rating"
        />
        <span class="span">${movie.rank}</span>
        </div>

        <div class="separator"></div>

        <div class="meta-item">${movie.duration}m</div>

        <div class="separator"></div>

        <div class="meta-item">${movie.year}</div>

        <div class="meta-item card-badge">${movie.age_rating}</div>
        </div>

        <p class="genre">${getGenres(genredata)}</p>

        <p class="overview">${movie.summary}</p>

        <ul class="detail-list">
        <div class="list-item">
        <p class="list-name">Starring</p>
        <p>${getCasts(castdata)}</p>
        </div>

        <div class="list-item">
        <p class="list-name">Directed By</p>
        <p>${getDirectors(directorsdata)}</p>
        </div>
        </ul>
        </div>

        <div class="title-wrapper">
        <h3 class="title-large">Trailer and Clips</h3>
        </div>

        <div class="slider-list">
        <div class="slider-inner"></div>
        </div>
        </div>
        `;

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${movie.trailer_id}?&theme=dark&color=white&rel=0"" frameborder="0" allowfullscreen="1" title="idk" class="img-cover" loading="lazy"></iframe>
        `;
        movieDetail.querySelector(".slider-inner").appendChild(videoCard);
        pageContent.appendChild(movieDetail);
        fetchDataFromServer("movies", addSuggestedMovies);
    }
);


const addSuggestedMovies = function ({ data }) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "Related movies";

    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="title-large">Related movies</h3>
    </div>

    <div class="slider-list">
    <div class="slider-inner"></div>
    </div>
    `;

    for (const movie of data) {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);
};

search();
