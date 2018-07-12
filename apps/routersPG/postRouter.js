import express from "express"
const router = express.Router()
import { Post } from "../modelsPG/Post"
//import vào để test xem có connect thành công không
import { sequelize, Op } from "../databases/databases"

router.post("/newPost", (req, res) => {
	const { title, content, author, created_at, updated_at } = req.body
	req.body.created_at = new Date()
	req.body.updated_at = new Date()
	Post.create(
		{ title, content, author, created_at, updated_at },
		{ fields: ["title", "content", "author"] }
	)
		.then(newPost => {
			res.json({
				result: "SUCCESS",
				data: newPost,
				description: `Tạo mới bài viết thành công`
			})
		})
		.catch(err => {
			res.json({
				result: "FAILED",
				data: "",
				description: `Create new post failed. Error = ${err}`
			})
		})
})

//Hàm kiểm tra xem đã connect được tới database chưa
sequelize
	.authenticate()
	.then(() => {
		console.log("CONNECTION SUCCESSFULLY ------------- POSTGRESQL")
	})
	.catch(err => {
		console.error("CONNECTION ERRROR ----------- POSTGRESQL", err)
	})

module.exports = router
