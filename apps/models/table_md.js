import db from "../common/database"
const conn = db.getConnection()

const createPosts = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS posts
            (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content LONGTEXT NOT NULL,
            avatar MEDIUMTEXT,
            author VARCHAR(255),
            view_post INT(6) NOT NULL,
            like_post INT(6) NOT NULL,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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
const createSkills = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS skills(
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            html_icon MEDIUMTEXT  NOT NULL,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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
const createProjects = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS projects(
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            intro MEDIUMTEXT NOT NULL,
            description MEDIUMTEXT  NOT NULL,
            link_project  MEDIUMTEXT  NOT NULL,
            link_images MEDIUMTEXT,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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
const createUsers = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS users(
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            avatar VARCHAR(255),
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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
const createUsersMxh = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS users_mxh(
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			mxh VARCHAR(255) NOT NULL,
            access_token VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            avatar VARCHAR(255),
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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
const createTodos = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			`CREATE TABLE IF NOT EXISTS todos(
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            prioritize VARCHAR(255) NOT NULL,
            describes MEDIUMTEXT NOT NULL,
            created_at DATETIME,
            updated_at DATETIME
            ) CHARACTER SET=utf8;`,
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

module.exports = {
	createPosts,
	createSkills,
	createProjects,
	createUsers,
	createTodos,
	createUsersMxh
}
