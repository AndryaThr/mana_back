const db = require('./db_connection');

async function mana(mana_month, mana_day) {

    return new Promise((resolve, reject) => {
        let mana = "SELECT * FROM mana WHERE \(month = \"" + mana_month + "\"AND day = " + mana_day + "\)";
        db.each(mana, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                resolve(result);
            }
        });
    })
};

module.exports = mana