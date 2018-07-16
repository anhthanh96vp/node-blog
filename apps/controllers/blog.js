import express from "express"
import axios from "axios"
const router = express.Router()

//import post để kết nối tới database
import postMd from "../models/post_md"
import skillMd from "../models/skill_md"
import projectMd from "../models/project_md"

const api = "http://5b4ac9d830ebac001419f241.mockapi.io/api/v1/"

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /blog
// Lấy các bài post, skill, project trên database và render ra 1 list ở trang chủ
router.get("/", (req, res) => {
	let posts = postMd.getAllPosts()
	let skills = skillMd.getAllSkills()
	let projects = projectMd.getAllProjects()

	Promise.all([skills, projects, posts])
		.then(data => {
			res.render("blog/index", {
				result: true,
				data: data,
				message: "Successfull"
			})
		})
		.catch(reason => {
			res.render("blog/index", {
				result: false,
				data: {},
				message: `Err = ${err}`
			})
		})
})

// PHẦN SKILL

router.get("/skill/new_skill", (req, res) => {
	res.render("blog/skills/new_skill", {})
})

//post skills
router.post("/skill/new_skill", (req, res) => {
	let params = req.body

	//check lỗi

	if (params.title.trim() == 0) {
		res.render("blog/skills/new_skill", {
			data: { err: "Bạn phải nhập đầy đủ các trường" }
		})
	} else {
		let date = new Date()
		params.created_at = date
		params.updated_at = date

		let data = skillMd.addSkill(params)

		data.then(skill => {
			res.redirect("/blog")
		}).catch(err => {
			res.render("blog/skills/new_skill", {
				result: false,
				data: {},
				message: `Err = ${err}`
			})
		})
	}
})

// PHẦN PROJECT

// router.get("/projects/new_project", (req, res) => {
// 	res.render("blog/projects/new_project", {})
// })

// //post skills
// router.post("/project/new_project", (req, res) => {
// 	let params = req.body

// 	//check lỗi
// 	if (params.title.trim() == 0 || params.html_icon.trim() == 0) {
// 		res.render("blog/projects/new_project", {
// 			message: "Bạn phải nhập đầy đủ các trường"
// 		})
// 	} else {
// 		let date = new Date()
// 		params.created_at = date
// 		params.updated_at = date

// 		let data = skillMd.addSkill(params)

// 		data.then(skill => {
// 			res.redirect("/blog")
// 		}).catch(err => {
// 			res.render("blog/projects/new_project", {
// 				result: false,
// 				data: {},
// 				message: `Err = ${err}`
// 			})
// 		})
// 	}
// })

// Render ra 1 trang web chi tiết dựa vào id
router.get("/post/:id", (req, res) => {
	let data = postMd.getPostById(req.params.id)
	data.then(posts => {
		let post = posts[0]
		let data = { post: post, err: false }
		res.render("blog/post", { data: data })
	}).catch(err => {
		let data = { err: "Không tìm thấy bài viết" }
		res.render("blog/post", { data: data })
	})
})

module.exports = router
