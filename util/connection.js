const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'knowledge_base',
    password: 'sam'
});

module.exports = pool.promise();