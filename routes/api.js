var express = require('express');
var router = express.Router();
var mysql = require('mysql2')

/* GET home page. */
router.post('/mediana/calculate/', function(req, res) {
  /*
  shrani v bazo
  */
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mijav123',
  database: 'default'
});


connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database: ', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

/*
izracunaj mediano
*/
const request_data = req.body /* data je seznam stevilk*/
console.log(request_data)
/*
izracunaj mediano iz request_data.data
*/

// Pridobimo seznam števil iz objekta
const numList = request_data.data;
if (!numList) {
  res.sendStatus(400);
}
// Uredimo seznam števil v naraščajočem vrstnem redu
numList.sort(function(a, b) {
  return a - b;
});

// Izračunamo mediano
const n = numList.length;
let mediana;
if (n % 2 == 0) {
  mediana = (numList[n/2 - 1] + numList[n/2]) / 2;
} else {
  mediana = numList[Math.floor(n/2)];
}

console.log("Mediana je: " + mediana);

connection.query(`INSERT INTO default.bankart (mediana) values (${mediana})`, (error, results, fields) => {
  if (error) {
    console.error('Error executing MySQL query: ', error);
    return res.status(400).send('Internal Server Error');
  }
});

 const data = {
  data: mediana
 }
 res.json(data);
});

router.get('/mediana/get', function(req, res, next) {
  /*
  beri iz baze
  */

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mijav123',
    database: 'default'
  });
  
  
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database: ', error);
    } else {
      console.log('Connected to MySQL database');
    }
    
    connection.query(`SELECT * FROM default.bankart ORDER BY CREATED_AT DESC`, (error, results, fields) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });
});

module.exports = router;
