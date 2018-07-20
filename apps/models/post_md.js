//import sử dụng hàm connect bên file database

import db from "../common/database"
const conn = db.getConnection()

//Hàm select posts lên database lấy dữ liệu về
const getAllPosts = () => {
	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	// ORDER BY updated_at DESC LIMIT 6
	let promise = new Promise((resolve, reject) => {
		let query = conn.query("SELECT * FROM posts", (err, posts) => {
			if (err) {
				reject(err)
			} else {
				resolve(posts)
			}
		})
	})
	return promise
}

const getAllPostsLimit = () => {
	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"SELECT * FROM posts ORDER BY updated_at DESC LIMIT 6",
			(err, posts) => {
				if (err) {
					reject(err)
				} else {
					resolve(posts)
				}
			}
		)
	})
	return promise
}

//hàm add thêm bài post
//Tương tự như bên post user
const addPost = params => {
	if (params) {
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
		return promise
	}
	return false
}

const getPostById = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				//tìm các post có id giống id click
				"SELECT * FROM posts WHERE ?",
				{ id: id },
				(err, posts) => {
					if (err) {
						reject(err)
					} else {
						resolve(posts)
					}
				}
			)
		})
		return promise
	}
	return false
}

const updatePost = params => {
	if (params) {
		let promise = new Promise((resolve, reject) => {
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

const deletePost = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"DELETE FROM posts WHERE id = ?",
				id,
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

const addLikeById = params => {
	// console.log(params);
	if (params) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"UPDATE posts SET like_post = like_post + 1 WHERE id = ?",
				params.id,
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
const minusLikeById = params => {
	if (params) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"UPDATE posts SET like_post = like_post - 1 WHERE id = ?",
				params.id,
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
const addViewById = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"UPDATE posts SET view_post = view_post + 1 WHERE id = ?",
				id,
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
module.exports = {
	getAllPosts,
	getAllPostsLimit,
	addPost,
	getPostById,
	updatePost,
	deletePost,
	addLikeById,
	minusLikeById,
	addViewById
}
