import db from "../common/database"
const conn = db.getConnection()

const getAllSkills = () => {
	let promise = new Promise((resolve, rejects) => {
		let query = conn.query("SELECT * FROM skills", (err, skills) => {
			if (err) {
				reject(err)
			} else {
				resolve(skills)
			}
		})
	})
	return promise
}
module.exports = { getAllSkills }
