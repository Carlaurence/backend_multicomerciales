const dotenv = require('dotenv').config();

const config = {
    appConfig:{
        host:process.env.APP_HOST,
        port:process.env.APP_PORT
    },

    dbConfig:{
        name:process.env.MONGODB_NAME,
        uri:process.env.MONGODB_URI
    }
}
module.exports = config;