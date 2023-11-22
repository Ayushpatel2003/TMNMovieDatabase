"use strict";

// import all components and functions

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sidebar();

// Home page sections (Top rated, Upcoming, Trending Movies)
const homePageSections = [
    {
        title: "Trending Movies",
        path: "movies/trending",
    },
    {
        title: "Top Rated Movies",
        path: "movies/top_rated",
    },
];

// Fetch all genres then change genre format
const genreList = {
    // create genre string from genre_id eg: [23, 43] -> "Action, Romance".
    asString(genreIdList) {
        let newGenreList = [];

        for (const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);
            // this.genreList;
        }
        return newGenreList.join(", ");
    },
};

fetchDataFromServer(
    "genres",
    function ({data}) {
        for (const { genre_id, genre_name } of data) {
            genreList[genre_id] = genre_name;
        }

        fetchDataFromServer(
            "movies",
            heroBanner
        );
    }
);

const heroBanner = function ({ data }) {
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Movies";

    banner.innerHTML = `
    <div class="banner-slider"></div>

    <div class="slider-control">
    <div class="control-inner">
    </div>
    </div>
    `;

    let controlItemIndex = 0;

    for (var i=0; i<data.length; ++i){
        const movie = data[i];

        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute("slider-item", "");

        sliderItem.innerHTML = `
        <img
        src="./assets/images/slider-banner.jpg"
        alt="${movie.title}"
        class="img-cover"
        loading="${i === 0 ? "eager" : "lazy"}"
        />
        <div class="banner-content">
        <h2 class="heading">${movie.title}</h2>

        <div class="meta-list">
        <div class="meta-item">${movie.year}</div>
        <div class="meta-item card-badge">${movie.rank}</div>
        </div>
        <p class="genre">${genreList.asString([movie.genre_id])}</p>
        <p class="banner-text">${movie.summary}</p>

        <a href="./detail.html" class="btn" onclick="getMovieDetail(${movie.movie_id})">
        <img
        src="./assets/images/play_circle.png"
        width="24"
        height="24"
        aria-hidden="true"
        alt="play circle"
        />
        <span class="span">Watch Now</span>
        </a>
        </div>
        `;

        banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "slider-item");
        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = `
        <img
        src="https://raw.githubusercontent.com/Ayushpatel2003/TMNMovieDatabase/main/server/db/assets/${movie.poster_id}"
        alt="Slide to ${movie.title}"
        loading="lazy"
        draggable="false"
        class="img-cover"
        />
        `;
        banner.querySelector(".control-inner").appendChild(controlItem);
    }
    pageContent.appendChild(banner);

    addHeroSlide();

    // fetch data from home page sections (top rated, upcoming,trending).
    for (const { title, path } of homePageSections) {
        fetchDataFromServer(path, createMovieList, title);
    }
};

// Hero Slider Functionality
const addHeroSlide = function () {
    const sliderItems = document.querySelectorAll("[slider-item]");
    const sliderControls = document.querySelectorAll("[slider-control]");

    let lastSliderItem = sliderItems[0];
    let lastSliderControl = sliderControls[0];
    let currentSliderIndex = 0;

    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    const sliderStart = function () {
        const controlIndex = Number(this.getAttribute("slider-control"));
        if (currentSliderIndex !== controlIndex) {
            lastSliderItem.classList.remove("active");
            lastSliderControl.classList.remove("active");

            sliderItems[controlIndex].classList.add("active");
            this.classList.add("active");

            lastSliderItem = sliderItems[controlIndex];
            lastSliderControl = this;
            currentSliderIndex = controlIndex;
        }
    };

    const slideToNext = function () {
        const nextIndex = (currentSliderIndex + 1) % sliderItems.length;
        sliderControls[nextIndex].click();
    };

    // Automatic sliding every 5 seconds
    setInterval(slideToNext, 5000);

    addEventOnElements(sliderControls, "click", sliderStart);
};

const createMovieList = function ({ data }, title) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = `${title}`;

    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h3 class="title-large">${title}</h3>
    </div>

    <div class="slider-list">
    <div class="slider-inner"></div>
    </div>
    `;

    for (const movie of data) {
        // Called from movie_card.js
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);
};

search();
