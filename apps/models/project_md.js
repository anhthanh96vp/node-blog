import db from "../common/database"
const conn = db.getConnection()

const getAllProjects = () => {
	// hàm xử lý khí connect server sau đó select posts tới database
	// dữ liệu đổ về biến posts
	let promise = new Promise((resolve, reject) => {
		let query = conn.query("SELECT * FROM projects", (err, posts) => {
			if (err) {
				reject(err)
			} else {
				resolve(posts)
			}
		})
	})
	return promise
}

module.exports = { getAllProjects }
