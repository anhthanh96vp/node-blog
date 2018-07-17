import db from "../common/database"
const conn = db.getConnection()

const getAllSkills = () => {
	let promise = new Promise((resolve, rejects) => {
		let query = conn.query(
			"SELECT * FROM skills ORDER BY updated_at DESC LIMIT 50",
			(err, skills) => {
				if (err) {
					reject(err)
				} else {
					resolve(skills)
				}
			}
		)
	})
	return promise
}

const addSkill = params => {
	if (params) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"INSERT INTO skills SET ?",
				params,
				(err, skill) => {
					if (err) {
						reject(err)
					} else {
						resolve(skill)
					}
				}
			)
		})
		return promise
	}
	return false
}

const getSkillById = id => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"SELECT * FROM skills WHERE ?",
			{ id: id },
			(err, skills) => {
				if (err) {
					reject(err)
				} else {
					resolve(skills)
				}
			}
		)
	})
	return promise
}

const updateSkill = params => {
	let promise = new Promise((resolve, reject) => {
		let query = conn.query(
			"UPDATE skills SET title = ?, html_icon = ?, updated_at = ? WHERE id = ?",
			[params.title, params.html_icon, new Date(), params.id],
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
const deleteSkill = id => {
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"DELETE FROM skills WHERE id = ?",
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
	getAllSkills,
	addSkill,
	getSkillById,
	updateSkill,
	deleteSkill
}
