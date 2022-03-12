const express = require('express');
const final = require('./localhost.json');
const app = express();
const db = require('./db_connection');
const namebook= require('./mapBoky.json');
const bible= require('./baiboly.json')

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//db.run("CREATE TABLE test (id VARCHAR(15), name VARCHAR(25), code VARCHAR(5), chapter INTEGER, verse INTEGER, texts TEXT)")
//db.run("DROP TABLE test")

let a= bible["body"]
for( let i in a){

  //pour le name
  let names= namebook[a[i]['id']]['name'];
  //console.log(names)

  //pour le code
  let codes= namebook[a[i]['id']]['code'];
  //console.log(codes)
  
  //chapter
  //console.log(final[codes])
  for (const chapters in final[codes]){ 
      //console.log(chapters);
      
  //verse
  for(let verse in final[codes][chapters]){
    //console.log("***"+ verse)

  //text
    let text= final[codes][chapters][verse]
    //console.log(": "+text)

  //id
  let id_use= codes+" "+chapters+"."+verse;
  //console.log(id_use);
  
// db.run("INSERT INTO test (id, name, code, chapter, verse, texts) VALUES(?,?,?,?,?,?)", [id_use, names,codes,chapters, verse,text])
    } 
  }
}

//pour mettre en ordre les éléments dans baiboly.db
for( let i in a){
  let codes= namebook[a[i]['id']]['code'];
db.each("SELECT * FROM test WHERE code = \'"+codes +"\' ORDER BY chapter, verse", function(err, row){
      if (err) {
        console.log(err);
    } else {
    //console.log(row.code +row.chapter  + " a écrit '" + row.verse + "'");
    }
  });
}

db.close()
console.log("tapitra")

app.get('/', (req, res) => {
  res.json(
    {'res': "ok",}
  )
}) 

module.exports = app;