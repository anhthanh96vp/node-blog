//import sử dụng hàm connect bên file database

import db from "../common/database"
const conn = db.getConnection()

//import module promise
import q from "q"

//Hàm select posts lên database lấy dữ liệu về
const getAllPosts = () => {
	let defer = q.defer()

	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	let query = conn.query("SELECT * FROM posts", (err, posts) => {
		if (err) {
			defer.reject(err)
		} else {
			defer.resolve(posts)
		}
	})
	return defer.promise
}

//hàm add thêm bài post
//Tương tự như bên post user
const addPost = params => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"INSERT INTO posts SET ?",
			params,
			(err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			}
		)
	})
	// Return the promise
	return promise
}

const getPostById = id => {
	if (id) {
		let defer = q.defer()

		let query = conn.query(
			//tìm các post có id giống id click
			"SELECT * FROM posts WHERE ?",
			{ id: id },
			(err, posts) => {
				if (err) {
					defer.reject(err)
				} else {
					defer.resolve(posts)
				}
			}
		)
		return defer.promise
	}
	return false
}

const updatePost = params => {
	if (params) {
		let defer = q.defer()

		let query = conn.query(
			"UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?",
			[
				params.title,
				params.content,
				params.author,
				new Date(),
				params.id
			],
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

const deletePost = id => {
	if (id) {
		let defer = q.defer()

		let query = conn.query(
			"DELETE FROM posts WHERE id = ?",
			id,
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
module.exports = {
	getAllPosts,
	addPost,
	getPostById,
	updatePost,
	deletePost
}
