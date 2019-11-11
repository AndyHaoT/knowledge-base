const dotenv = require('dotenv');

console.log('Setting Environment Variables');

dotenv.config();

const envvars = [
    "DOMAIN",
    "NODE_ENV",
    "PORT",
    "SESSION_SECRET",
    "MYSQL_HOST",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
];

envvars.forEach(key => {
    if (!process.env[key]) {
        throw `Missing environment variable ${key}`;
    }
});