import db from "../common/database"
const conn = db.getConnection()

const getAllProjects = () => {
	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"SELECT * FROM projects ORDER BY updated_at DESC LIMIT 9",
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

module.exports = { getAllProjects, addProject }
