const { createPool } = require("mysql");

const pool = createPool({
    host : '34.101.62.172',
    port: '3306',
    user : 'root',
    password : '',
    database :'teras-db',
    connectionLimit:10,
});

module.exports = pool;