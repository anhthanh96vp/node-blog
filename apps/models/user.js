//import sử dụng hàm connect bên file database

import db from "../common/database"
const conn = db.getConnection()

//import module promise
import q from "q"

//Hàm insert user lên database
const addUser = user => {
	if (user) {
		let defer = q.defer()

		// hàm xử lý khí connect server sau đó insert user lên database
		let query = conn.query(
			"INSERT INTO users SET ?",
			user,
			(err, result) => {
				if (err) {
					defer.reject(err)
				} else {
					defer.resolve(result)
				}
			}
		)
		return defer.promise
	}
	return false
}

//Hàm get trường email ở trên DB về
const getUserByEmail = email => {
	if (email) {
		let defer = q.defer()

		// hàm xử lý khí connect server sau đó select user trên database
		let query = conn.query(
			//SHOW bảng users tìm các email giống với email nhập vào
			"SELECT * FROM users WHERE ?",
			{ email: email },
			(err, result) => {
				if (err) {
					defer.reject(err)
				} else {
					//Trả về mảng chứa data users đều có email như nhập vào
					defer.resolve(result)
				}
			}
		)
		return defer.promise
	}
	return false
}

const getAllUsers = () => {
	let defer = q.defer()

	// hàm xử lý khí connect server sau đó select user trên database
	let query = conn.query(
		//SHOW tất caqr bảng users
		"SELECT * FROM users",
		(err, users) => {
			if (err) {
				defer.reject(err)
			} else {
				//Trả về mảng chứa data users đều có email như nhập vào
				defer.resolve(users)
			}
		}
	)
	return defer.promise
}

module.exports = { addUser, getUserByEmail, getAllUsers }
