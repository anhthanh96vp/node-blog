import express from "express"
import axios from "axios"
const router = express.Router()

//import post để kết nối tới database
import postMd from "../models/post"
import skillMd from "../models/skill"

const api = "http://5b4ac9d830ebac001419f241.mockapi.io/api/v1/"

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /blog
// Lấy các bài post trên database và render ra 1 list ở trang chủ
router.get("/", (req, res) => {
	let data = postMd.getAllPosts()
	data.then(posts => {
		let data = { posts: posts, err: false }
		res.render("blog/index", { data: data })
	}).catch(err => {
		let data = { err: "Không tìm thấy dữ liệu bài post" }
		res.render("blog/index", { data: data })
	})
})

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

//Doi lai cach viet moi
//trả về dữ liệu json kiểu của client
router.get("/getAllSkills", (req, res) => {
	let data = skillMd.getAllSkills()
	data.then(skills => {
		res.json({
			result: true,
			data: skills,
			message: "Successfull"
		})
	}).catch(err => {
		res.json({
			result: false,
			data: {},
			message: `Err = ${err}`
		})
	})
})

//post skills
router.post("/postSkills", (req, res) => {
	let params = req.body

	//check lỗi
	if (params.title.trim() == 0 || params.html_icon.trim() == 0) {
		res.json({ err: "Bạn phải nhập đầy đủ các trường" })
	} else {
		let date = new Date()
		params.created_at = date
		params.updated_at = date

		let data = skillMd.addSkill(params)

		data.then(skill => {
			res.json({
				result: true,
				data: skill,
				message: "Successfull"
			})
		}).catch(err => {
			res.json({
				result: false,
				data: {},
				message: `Err = ${err}`
			})
		})
	}
})

//edit skilks

router.put("/updateSkill", (req, res) => {
	let params = req.body
	let data = postMd.updatePost(params)

	if (data) {
		data.then(result => {
			res.json({ status_code: 200, data })
		}).catch(err => {
			res.json({ status_code: 500 })
		})
	} else {
		res.json({ status_code: 500 })
	}
})

module.exports = router
