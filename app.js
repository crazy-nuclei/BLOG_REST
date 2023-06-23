const express = require('express');
const cors = require('cors');

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

module.exports = app;