import express from "express"
const router = express.Router()

//import post để kết nối tới database
import postMd from "../models/post"

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /blog
router.get("/", (req, res) => {
	let data = postMd.getAllPosts()

	data.then(posts => {
		let data = { posts: posts, err: false }
		res.render("blog/index", { data: data })
	}).catch(err => {
		let result = { err: "Không tìm thấy dữ liệu bài post" }
		res.render("blog/index", { data: data })
	})
})

module.exports = router
