//import sử dụng hàm connect bên file database

import db from "../common/database"
const conn = db.getConnection()

//import module promise
import q from "q"

//Hàm insert posts lên database
const getAllPosts = () => {
	let defer = q.defer()

	// hàm xử lý khí connect server sau đó select posts tới database
	let query = conn.query("SELECT * FROM posts", (error, posts) => {
		if (error) {
			defer.reject(error)
		} else {
			defer.resolve(posts)
		}
	})
	return defer.promise
}

module.exports = {
	getAllPosts
}
