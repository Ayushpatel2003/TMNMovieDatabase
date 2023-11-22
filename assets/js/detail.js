"use strict";

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";

import { sidebar } from "./sidebar.js";

import { createMovieCard } from "./movie-card.js";

import { search } from "./search.js";

const movieId = window.localStorage.getItem("movieId");

const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = function (genreList) {
    const newGenreList = [];

    for (const { name } of genreList) newGenreList.push(name);
    return newGenreList.join(", ");
};

const getCasts = function (castList) {
    const newCastList = [];

    for (let i = 0, len = castList.length; i < len && len && i < 10; i++) {
        const name = castList[i].fname + " " + castList[i].lname;
        newCastList.push(name);
    }
    return newCastList.join(", ");
};

const getDirectors = function (crewList) {
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorList = [];
    for (const { name } of directors) directorList.push(name);
    return directorList.join(", ");
};

// returns only trailers and teasers as array
const filterVideos = function (videoList) {
    return videoList.filter(
        ({ type, site }) =>
        (type === "Trailer" || type === "Teaser") && site === "Youtube"
    );
};

fetchDataFromServer(
    `moviedetail?movie_id=${movieId}`,
    function ({moviedata, castdata}) {
        console.log(moviedata, castdata);

        const movie = moviedata[0];

        document.title = `${movie.title} - TMN`;

        const movieDetail = document.createElement("div");
        movieDetail.classList.add("movie-detail");
        movieDetail.innerHTML = `
        <div
        class="backdrop-image"
        style="background-image: src=https://raw.githubusercontent.com/Ayushpatel2003/TMNMovieDatabase/main/server/db/assets/${movie.poster_id}"
        </div>

        <figure class="poster-box movie-poster">
        <img
        src="https://raw.githubusercontent.com/Ayushpatel2003/TMNMovieDatabase/main/server/db/assets/${movie.poster_id}"
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


        </div>


        <p class="overview">${movie.summary}</p>

        <ul class="detail-list">
        <div class="list-item">
        <p class="list-name">Starring</p>
        <p>${getCasts(castdata)}</p>
        </div>

        </div>

        <div class="title-wrapper">
        <h3 class="title-large">Trailer and Clips</h3>
        </div>

        <div class="slider-list">
        <div class="slider-inner"></div>
        </div>
        </div>
        `;



        pageContent.appendChild(movieDetail);

        // fetchDataFromServer(
        //   `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`,
        //   addSuggestedMovies
        // );
    }
);

const addSuggestedMovies = function ({ results: movieList }, title) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "You May Also Like";

    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="title-large">You May Also Like</h3>
    </div>

    <div class="slider-list">
    <div class="slider-inner"></div>
    </div>
    `;

    for (const movie of movieList) {
        // Called from movie_card.js
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);
};

search();
