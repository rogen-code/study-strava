const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'study_strava'
});

module.exports.getAll = () => {
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * from cows', function (error, results, fields) {
      if (error) reject(error);
      resolve(results)
    })
  })
};
