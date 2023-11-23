# TMN 🎞

![image](https://cdn.discordapp.com/attachments/994702763499986954/1176757155861385226/image.png?ex=65700781&is=655d9281&hm=b93fa9a2c6f0e388cd6363729ac68a7aa14a719a22a4a5a9a21f78f98dd5b5bf&)

# How to Run

**Hosting the Frontend**\
In the root folder, open a command prompt and type 
```
python -m http.server 8000
```
Now the frontend should be hosted on `localhost:8000`\

**Hosting the Server**\
For the beckend, we use node.js. But first navigate to server.js in the server folder and change the username and password to that of your SQL databse server\
![image](https://github.com/Ayushpatel2003/TMNMovieDatabase/assets/66975916/c1a7b239-b4b7-4bfd-be37-3649be28aac3)\
If you don't use a password, then comment out the password line.\
Then in the `server` folder, open a command prompt and type 
```
npm install
npm start
```
This will install all dependencies and start the server on `localhost:3000`\

**Hosting the Database**\
To host the databse locally, we recommend you use MySQL Workbench. In `server\db\sql\` folder, run the `create_db.sql` and `create_views.sql` scripts on your DBMS (MySQL Workbench in this case), then in the data `server\db\data\` folder you'd see the CSV files containing all sample data used for this project. Import the CSVs into the tables with matching names in the database\
\
Once all of this is done, the project should be up and running when you navigate to `localhost:8000` in your browser

## About this repo






