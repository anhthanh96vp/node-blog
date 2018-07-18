import db from "../common/database"
const conn = db.getConnection()

const getAllProjects = () => {
	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	// ORDER BY updated_at DESC LIMIT 9
	let promise = new Promise((resolve, reject) => {
		let query = conn.query("SELECT * FROM projects ", (err, posts) => {
			if (err) {
				reject(err)
			} else {
				resolve(posts)
			}
		})
	})
	return promise
}

const addProject = params => {
	if (params) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"INSERT INTO projects SET ?",
				params,
				(err, project) => {
					if (err) {
						reject(err)
					} else {
						resolve(project)
					}
				}
			)
		})
		return promise
	}
	return false
}

const getProjectById = id => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"SELECT * FROM projects WHERE ?",
			{ id: id },
			(err, projects) => {
				if (err) {
					reject(err)
				} else {
					resolve(projects)
				}
			}
		)
	})
	return promise
}

const updateProject = params => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"UPDATE projects SET title = ?, intro = ?, description = ?, link_project = ?, link_images = ?, updated_at = ? WHERE id = ?",
			[
				params.title,
				params.intro,
				params.description,
				params.link_project,
				params.link_images,
				new Date(),
				params.id
			],
			(err, result) => {
				if (err) {
					reject(err)
				} else {
					console.log(params)
					resolve(result)
				}
			}
		)
	})
	return promise
}
const deleteProject = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"DELETE FROM projects WHERE id = ?",
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
	getAllProjects,
	addProject,
	getProjectById,
	updateProject,
	deleteProject
}
