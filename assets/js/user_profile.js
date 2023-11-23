const pageContent = document.querySelector("[page-content]");
console.log(pageContent);

const userId = getUserProfile();
search();


const showRecentlyViewed = function({ data }) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "Related movies";

    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="title-large">Recently Viewed</h3>
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
}


fetchDataFromServer("recents", showRecentlyViewed);
