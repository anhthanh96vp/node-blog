import config from "config"
import mysql from "mysql"

const host = config.get("server.host")
const port = config.get("server.port")

//Lấy dữ liệu từ file config
let options = {
	host: config.get("mysql.host"),
	user: config.get("mysql.user"),
	password: config.get("mysql.password"),
	database: config.get("mysql.database"),
	port: config.get("mysql.port")
}

//Khởi tạo connect server
let connection = mysql.createConnection(options)

connection.connect()

const getConnection = () => {
	if (!connection) {
		connection.connect()
	}
	console.log("Connect database success")
	return connection
}

module.exports = { getConnection }
