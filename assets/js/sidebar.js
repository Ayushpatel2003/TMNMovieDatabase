function sidebar() {
    // Fetch all genres then change genre format
    const genreList = {};

    fetchDataFromServer(
        "genres",
        function ({ data }) {
            for (const { genre_id, genre_name } of data) {
                genreList[genre_id] = genre_name;
            }
            genreLink();
        }
    );

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");

    sidebarInner.innerHTML = `
    <div class="sidebar-inner">
    <div class="sidebar-list">
    <p class="title">Genre</p>
    </div>
    <div class="sidebar-footer">
    <p class="copyright">Copyright 2023</p>
    <a href="${GitHubLink}" style="font-size:15px">
        <img src="https://img.icons8.com/ios-filled/25/ffffff/github.png" alt="github"/>
        Group 11
    </a>
    <br/>
    </div>
    </div>
    `;

    const genreLink = function () {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movie_list.html");
            link.setAttribute("menu-close", "");
            link.setAttribute(
                "onclick",
                `getMovieList("${genreId}", "${genreName}")`
            );
            link.textContent = genreName;
            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }

        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    };

    const toggleSidebar = function (sidebar) {
        // Toggle sidebar in Mobile Screen
        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        addEventOnElements(sidebarTogglers, "click", function () {
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        addEventOnElements(sidebarClose, "click", function () {
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    };
}
