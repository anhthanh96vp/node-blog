import express from "express"

const router = express.Router()

import todoMd from "../models/todo"

router.get("/", (req, res) => {
	let data = todoMd.getAlljob()

	data.then(jobs => {
		let data = { jobs: jobs, err: false }
		res.render("todo/todos", { data: data })
	}).catch(err => {
		let data = { err: "Không tìm thấy jobs" }
		res.render("todo/todos", { data: data })
	})
})

router.post("/", (req, res) => {
	let job = req.body

	if (job) {
		let newDate = new Date()
		job.created_at = newDate
		job.updated_at = newDate

		let data = todoMd.addJob(job)

		data.then(job => {
			res.render("todo/todos")
		}).catch(err => {
			let data = { err: "Có lỗi khi khởi tạo công việc" }
			res.render("todo/todos", {
				data: data
			})
		})
	}
})
module.exports = router
