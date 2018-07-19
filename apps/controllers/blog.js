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
	let posts = postMd.getAllPostsLimit()
	let skills = skillMd.getAllSkills()
	let projects = projectMd.getAllProjectsLimit()

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
				message: `Err = ${reason}`
			})
		})
})

// Render ra 1 trang web chi tiết dựa vào id
router.get("/post/:id", (req, res) => {
	let data = postMd.getPostById(req.params.id)
	data.then(posts => {
		//add view len database
		let view = postMd.addViewById(req.params.id)
		let post = posts[0]
		let data = { post: post, err: false }
		res.render("blog/posts/postDetail", { data: data })
	}).catch(err => {
		let data = { err: "Không tìm thấy bài viết" }
		res.render("blog/posts/postDetail", { data: data })
	})
})

router.put("/posts/checklike", (req, res) => {
	let params = req.body

	if (params.checkLike == true) {
		let data = postMd.addLikeById(params)
		data.then(result => {
			let data = result
			res.json({ status_code: 200, data })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	} else {
		let data = postMd.minusLikeById(params)
		data.then(result => {
			let data = result
			res.json({ status_code: 200, data })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	}
})
module.exports = router
