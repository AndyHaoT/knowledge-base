const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'knowledge_base',
    password: ''
});

module.exports = pool.promise();