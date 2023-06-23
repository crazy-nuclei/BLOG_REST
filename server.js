require('dotenv').config();
require('./helpers/mongo.helper');

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVER listening on port : ${PORT}`);
})