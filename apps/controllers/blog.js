import express from "express"
const router = express.Router()

//import post để kết nối tới database
import postMd from "../models/post"

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

router.get("/about", (req, res) => {
	res.render("blog/aboutDetail")
})
module.exports = router
