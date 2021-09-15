require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const checkAuth = require("./checkAuth");
const flash = require('connect-flash');

const MongoStore = require('connect-mongo');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const uploadRouter = require('./routes/upload');
const itemRouter = require('./routes/item');


const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Connecting to MongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})
app.use(
    session({
        secret: "secret", // used to sign the cookie
        resave: false, // update session even w/ no changes
        saveUninitialized: true, // always create a session
        store: MongoStore.create({ mongoUrl: URI  }),
        cookie: {
            secure: false, // true: only accept https req's
            maxAge: 2592000, // time in seconds aka 30 days
        },
    })
);
app.use(fileUpload({
    useTempFiles: true
}))
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/user', usersRouter);
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', itemRouter)
app.use('/', checkAuth, indexRouter);


module.exports = app;
