const express = require('express');
const cors = require('cors');
const createErrors = require('http-errors');
const userRoute = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin : "*",
}))

app.get('/', (req, res) => {
    res.send("HELLO FROM BLOG APP");
});

app.use('/user', userRoute);

// all the routes that does not exist 
app.use((req, res, next) => {
    next(createErrors.NotFound('This route does not exist'));
})

// handling errors 
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        status : err.status || 500, 
        message : err.message || "Internal Server Error"
    })
}) 

module.exports = app;