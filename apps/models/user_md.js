//import sử dụng hàm connect bên file database
import db from "../common/database"
const conn = db.getConnection()

//import module promise

const getAllUsers = () => {
	let promise = new Promise((resolve, reject) => {
		// hàm xử lý khí connect server sau đó select user trên database
		let query = conn.query(
			//SHOW tất cả bảng users
			"SELECT * FROM users",
			(err, users) => {
				if (err) {
					reject(err)
				} else {
					//Trả về mảng chứa data users đều có email như nhập vào
					resolve(users)
				}
			}
		)
	})
	return promise
}

//Hàm insert user lên database
const addUser = user => {
	if (user) {
		let promise = new Promise((resolve, reject) => {
			// hàm xử lý khí connect server sau đó insert user lên database
			let query = conn.query(
				"INSERT INTO users SET ?",
				user,
				(err, result) => {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
		return promise
	}
	return false
}

//Hàm get trường email ở trên DB về
const getUserByEmail = email => {
	if (email) {
		let promise = new Promise((resolve, reject) => {
			// hàm xử lý khí connect server sau đó select user trên database
			let query = conn.query(
				//SHOW bảng users tìm các email giống với email nhập vào
				"SELECT * FROM users WHERE ?",
				{ email: email },
				(err, result) => {
					if (err) {
						reject(err)
					} else {
						//Trả về mảng chứa data users đều có email như nhập vào
						resolve(result)
					}
				}
			)
		})
		return promise
	}
	return false
}

const getUserById = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			// hàm xử lý khí connect server sau đó select user trên database
			let query = conn.query(
				//SHOW bảng users tìm các email giống với email nhập vào
				"SELECT * FROM users WHERE ?",
				{ id: id },
				(err, result) => {
					if (err) {
						reject(err)
					} else {
						//Trả về mảng chứa data users đều có email như nhập vào
						resolve(result)
					}
				}
			)
		})
		return promise
	}
	return false
}

module.exports = { addUser, getUserByEmail, getAllUsers, getUserById }
