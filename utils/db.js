const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-54-165-36-134.compute-1.amazonaws.com',  
    user: 'hpjxaqartlepye',  
    database: 'd21k3cjb7845cu',  
    password: '85677de41db0276f84ac7a21c81004d34e0bf421a59a0be2439347d15aad857e',
    port: 5432,
    ssl: {
    	rejectUnauthorized: false,
	}
});

module.exports = pool;