const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(cors(), bodyParser.json());

// Endpoint to receive and store data
app.post('/saveData', (req, res) => {
    const data = req.body;
    console.log("FROM CLIENT: ", data);
    // db.query(`INSERT INTO players (\`firstName\`, \`lastName\`) VALUES (\`${data.firstName}\`, \`${data.lastName}\`)`,
    //     data, (err, result) => {
    //         console.log(err, result);
    //     }
    // );
    res.json({ message: 'Data saved successfully' });
});


// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, rows) => {
        if (rows.length == 0){
            db.query(`INSERT INTO users (\`username\`, \`password\`) VALUES ('${username}', '${password}')`, (err, rows) => {
                res.json({ user_id: rows.user_id, inserted: true });
            });
        }else{
            res.json({ user_id: rows[0].user_id, found: true, inserted: false });
        }
    });

});

// Signin endpoint
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, rows) => {
        if (rows.length == 0){
            res.json({ found: false });
        }else{
            res.json({ user_id: rows[0].user_id, found: true });
        }
    });

});


app.get('/moviedetail', (req, res) => {
    db.query(`SELECT * FROM movie WHERE movie_id IN (${req.query.movie_id})` , (err, movierows) => {
        db.query(`
            SELECT * FROM actor WHERE actor_id IN (
                SELECT cast_id FROM cast WHERE movie_id IN (${req.query.movie_id})
            );
        `, (err, castrows) => {
            db.query(`
                SELECT * FROM directors WHERE director_id IN (
                    SELECT director_id FROM direct WHERE movie_id IN (${req.query.movie_id})
                );
            `, (err, directrows) => {
                db.query(`
                    SELECT * FROM genre WHERE genre_id IN (
                        SELECT genre_id FROM movie WHERE movie_id IN (${req.query.movie_id})
                    );
                `, (err, genrerows) => {
                    res.json({
                        moviedata: movierows,
                        castdata: castrows,
                        directorsdata: directrows,
                        genredata: genrerows
                    });
                });
            });
        });
    });
});

// Endpoint to retrieve data
app.get('/genres', (req, res) => {
    db.query('SELECT * FROM genre', (err, rows) => {
        res.json({ data: rows });
    });
});
app.get('/genres/movies', (req, res) => {
    db.query(`SELECT movie_id FROM projectdb.moviesbygenres WHERE genre_id=${req.query.genre_id}`,
    (err, rows) => {
        db.query(`SELECT * FROM movie WHERE movie_id IN (${rows[0].movie_id})`, (err, rows) => {
            res.json({ data: rows });
        });
    });
});

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movie', (err, rows) => {
        res.json({ data: rows });
    });
});

app.get('/movies/top_rated', (req, res) => {
    db.query('SELECT * FROM movie ORDER BY movie.rank DESC LIMIT 10', (err, rows) => {
        res.json({ data: rows });
    });
});

app.get('/movies/newest', (req, res) => {
    db.query('SELECT * FROM movie ORDER BY movie.year DESC LIMIT 10', (err, rows) => {
        res.json({ data: rows });
    });
});

app.get('/movies/random', (req, res) => {
    db.query('SELECT * FROM movie ORDER BY RAND() DESC LIMIT 5', (err, rows) => {
        res.json({ data: rows });
    });
});

app.get('/movies/related', (req, res) => {
    db.query('SELECT * FROM movie ORDER BY RAND() DESC LIMIT 5', (err, rows) => {
        res.json({ data: rows });
    });
});

app.get('/search', (req, res) => {
    const text = req.query.query;
    db.query(`SELECT * FROM movie WHERE title LIKE '%${text}%'`, (err, rows) => {
        res.json({ data: rows });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
