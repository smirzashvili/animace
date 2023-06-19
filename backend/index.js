const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connection');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
//routers
const usersRouter = require('./routes/users');
const actorsRouter = require('./routes/actors');
const categoriesRouter = require('./routes/categories');
const articlesRouter = require("./routes/articles");
const authorsRouter = require("./routes/authors");
const tagsRouter = require("./routes/tags");
const reviewsRouter = require("./routes/reviews");
const commentsRouter = require("./routes/comments");
const moviesRouter = require("./routes/movies");
const seriesRouter = require("./routes/series");
const mangasRouter = require("./routes/mangas");
const genresRouter = require("./routes/genres");
const filtersRouter = require("./routes/filters");
const staffRouter = require("./routes/staff");

require('dotenv').config()

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.use(cookieParser())


app.use(bodyParser.json({extended: true }))
app.use(bodyParser.urlencoded({extended: true }))

app.use(express.json())

app.use(express.static(__dirname + "/build/"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build.index.html");
});
  

app.use(fileUpload({
    useTempFiles: true
}))

app.use('/api/users', usersRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/series', seriesRouter);
app.use('/api/mangas', mangasRouter);
app.use('/api/genres', genresRouter);
app.use('/api/filters', filtersRouter);
app.use('/api/staff', staffRouter);

const PORT = process.env.PORT || 5000

const start = async () => {
    connectDB(process.env.CONNECTION_STRING).then(
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        )
    ).catch (error => console.log(error)) 
}
  
start();
