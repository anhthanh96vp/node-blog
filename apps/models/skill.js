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
	if (id) {
		let promise = new Promise((resolve, reject) => {
			let query = conn.query(
				"SELECT * FROM posts WHERE ?",
				{ id: id },
				(err, skill) => {
					;(err, skill) => {
						if (err) {
							reject(err)
						} else {
							resolve(skill)
						}
					}
				}
			)
		})
	}
}
module.exports = { getAllSkills, addSkill, getSkillById }
