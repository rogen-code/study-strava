const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'study_strava',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports.writeSchools = (schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Schools (school_name) VALUES ("${schoolName}");`,
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}