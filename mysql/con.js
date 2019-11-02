const mysql = require('mysql')

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'yugioh_API_DB',
})

con.connect((err) => {
	if (err) console.log(err)
	else console.log('connected to DB')
})

module.exports = con