import express from "express"
const router = express.Router()

import tableMd from "../models/table_md"

router.get("/", (req, res) => {
	let posts = tableMd.createPosts()
	let skills = tableMd.createSkills()
	let projects = tableMd.createProjects()
	let users = tableMd.createUsers()


	Promise.all([users, skills, projects, posts])
		.then(data => {
			res.render("admin/block/createTable", {
				result: true,
				data: data,
				message: "Successfull"
			})
		})
		.catch(reason => {
			res.render("admin/block/createTable", {
				result: false,
				data: {},
				message: `Err = ${reason}`
			})
		})
})

module.exports = router
