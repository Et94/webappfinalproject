const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({  
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,  
    database: process.env.DB_DATABASE,  
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
    	rejectUnauthorized: false,
	}
});

module.exports = pool;