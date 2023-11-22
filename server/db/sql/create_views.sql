-- Movie User Ratings (view 1)
CREATE VIEW projectdb.MovieUserRatings AS
SELECT u.username, m.title, r.review
FROM projectdb.users u
JOIN projectdb.ratings r ON u.user_id = r.user_id
JOIN projectdb.movie m ON r.movie_id = m.movie_id;

-- Actors with multiple roles (view 2)
CREATE VIEW projectdb.ActorsWithMultipleRoles AS
SELECT c.actor_id, a.fname, a.lname,
       COUNT(*) AS number_of_roles
FROM projectdb.cast c
JOIN projectdb.actor a ON c.actor_id = a.actor_id
GROUP BY c.actor_id, a.fname, a.lname
HAVING COUNT(*) > ANY (SELECT COUNT(*) FROM projectdb.cast GROUP BY actor_id);

-- Actor Filmography
CREATE VIEW projectdb.ActorFilmography AS
SELECT A.fname, A.lname, (
    SELECT GROUP_CONCAT(M.title ORDER BY M.year ASC SEPARATOR ', ')
    FROM projectdb.cast AS C
    JOIN projectdb.movie AS M ON C.movie_id = M.movie_id
    WHERE C.actor_id = A.actor_id
) AS Filmography
FROM projectdb.actor AS A;

-- Movies and Ratings (view 4, MySQL doesn't support FULL JOIN)
CREATE VIEW projectdb.MoviesAndRatingsFullJoin AS
SELECT m.movie_id, m.title, m.year, m.age_rating, m.rank, r.user_id, r.review
FROM projectdb.movie m
LEFT JOIN projectdb.ratings r ON m.movie_id = r.movie_id

UNION

SELECT m.movie_id, m.title, m.year, m.age_rating, m.rank, r.user_id, r.review
FROM projectdb.ratings r
LEFT JOIN projectdb.movie m ON m.movie_id = r.movie_id;

-- Movies and directors nested union (view 5)
CREATE VIEW projectdb.MoviesAndDirectorsNestedUnion AS
SELECT movie_id, title, 'Movie' AS category
FROM (
    SELECT movie_id, title
    FROM projectdb.movie
    UNION
    SELECT director_id AS movie_id, CONCAT(fname, ' ', lname) AS title
    FROM projectdb.directors
) AS combined_data;

-- User Reviews (view 6)
CREATE VIEW projectdb.UserReviews AS
SELECT r.rating_id, m.title, u.fname AS user_fname, u.lname AS user_lname, r.review
FROM projectdb.ratings r
INNER JOIN projectdb.movie m ON r.movie_id = m.movie_id
INNER JOIN projectdb.users u ON r.user_id = u.user_id;

-- Common directors between movies (view 7)
CREATE VIEW projectdb.CommonDirectorsBetweenMovies AS
SELECT d1.director_id, d1.fname, d1.lname
FROM projectdb.directors d1
WHERE (
    SELECT COUNT(DISTINCT d.movie_id)
    FROM projectdb.direct d
    WHERE d.director_id = d1.director_id
) > 1;

-- Directors Best Movies (view 10)
CREATE VIEW projectdb.DirectorsBestMovies AS
SELECT d.director_id, d.fname, d.lname, m.title AS best_movie
FROM projectdb.directors d
LEFT JOIN projectdb.direct j ON d.director_id = j.director_id
LEFT JOIN projectdb.movie m ON j.movie_id = m.movie_id
ORDER BY d.director_id, m.rank DESC;

-- Movies by age rating
CREATE VIEW projectdb.MoviesByAgeRating AS
SELECT age_rating, COUNT(movie_id) AS movie_count
FROM projectdb.movie
GROUP BY age_rating;

-- Group movies by genres
CREATE VIEW projectdb.moviesbygenres AS
SELECT g.genre_id, g.genre_name, GROUP_CONCAT(m.movie_id) AS movie_id
FROM projectdb.genre g
LEFT JOIN projectdb.movie m ON g.genre_id = m.genre_id
GROUP BY g.genre_id, g.genre_name;

-- Top rated Movies (view 8)
CREATE VIEW projectdb.topratedmovies AS
SELECT * FROM projectdb.movie ORDER BY movie.rank DESC LIMIT 10;

-- Newest Movies (view 9)
CREATE VIEW projectdb.newestmovies AS
SELECT * FROM projectdb.movie ORDER BY movie.year DESC LIMIT 10;

-- Random Movies
CREATE VIEW projectdb.randommovies AS
SELECT * FROM projectdb.movie ORDER BY RAND() DESC LIMIT 5;
