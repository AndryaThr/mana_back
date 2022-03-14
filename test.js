var sq = require('sqlite3');
sq.verbose();

var db = new sq.Database(__dirname + '/baiboly.db');
let boky = require('./mapBoky.json')

let json = {};
for(var cle in boky)
{
    json[boky[cle].order] = {};
    json[boky[cle].order].ordre = boky[cle].order;
    json[boky[cle].order].codeT = cle;
    json[boky[cle].order].codeV = boky[cle].code;
    json[boky[cle].order].name = boky[cle].name;

}

// console.log(Object.keys (json) .length); 

for (var cle in json) 
{
    db.run("INSERT INTO anaranaBoky (id, codeFr, codeMg, livreMg) VALUES (?, ?, ?, ?)", [json[cle].ordre, json[cle].codeT, json[cle].codeV, json[cle].name]);
}




