const Pool = require('pg').Pool;

const  pool = new Pool({   
    user : 'dost',
    host : 'localhost',
    database : 'dost',
    password : 'd0stregi0n1',
    port : 5432
});


module.exports = pool;

