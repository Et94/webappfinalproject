const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-52-200-119-0.compute-1.amazonaws.com',  
    user: 'qmoypmesgtttly',  
    database: 'd6f0ta0sp4vrnm',  
    password: '6604986054213683d1e5040a190fbef366ecf0818b6657a2f4556d7dc2418f3e',
    port: 5432,
    ssl: {
    	rejectUnauthorized: false,
	},
});

module.exports = pool;