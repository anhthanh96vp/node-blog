import db from "../common/database"
const conn = db.getConnection()

//get todo list

const getAlljob = () => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query("SELECT * FROM todos", (err, jobs) => {
			if (err) {
				reject(err)
			} else {
				//Trả về mảng chứa data các jobs đều có email như nhập vào
				resolve(jobs)
			}
		})
	})
	return promise
}

const addJob = job => {
	if (job) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"INSERT INTO todos SET ?",
				job,
				(err, job) => {
					// err ? reject(err) : resolve(job)
					if (err) {
						reject(err)
					} else {
						resolve(job)
					}
				}
			)
		})
		return promise
	}
	return false
}

module.exports = { getAlljob, addJob }
