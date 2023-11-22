const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");

const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0;

fetchDataFromServer(
    `genres/movies?genre_id=${urlParam}`,
    function ({ data }) {
        // totalPages = total_pages;
        document.title = `${genreName} Movies - The Movie Network`;

        const movieListElem = document.createElement("section");
        movieListElem.classList.add("movie-list", "genre-list");
        movieListElem.ariaLabel = `${genreName} Movies`;

        movieListElem.innerHTML = `
        <div class="title-wrapper">
        <h1 class="heading">All ${genreName} Movies</h1>
        </div>

        <div class="grid-list">
        </div>
        `;

        // add movie card based on fetched item
        for (const movie of data) {
            const movieCard = createMovieCard(movie);
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
        }

        pageContent.appendChild(movieListElem);
    }
);

search();
