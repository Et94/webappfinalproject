let db = require('../utils/db');

function getUser(id) {
    return db.query(
        'Select * from users where userid = ' + id
    );
}

function updateUser(id, e) {
    db.query(
        "Update users set firstname = '" + e.firstname + "', lastname = '" + e.lastname + "', imageurl = '" + e.imageurl + "', about = '" + e.about + "', country = '" + e.country + "', dob = '" + e.dob + "' where userid = 1"
    );
}

module.exports = {
    getuser: getUser,
    update: updateUser
};