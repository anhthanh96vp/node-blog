import express from "express"
import axios from "axios"
const router = express.Router()

//--------------

import rp from "request-promise"
import cherio from "cheerio"

//import post để kết nối tới database
import postMd from "../models/post_md"
import skillMd from "../models/skill_md"
import projectMd from "../models/project_md"

const api = "https://viblo.asia/"

import request from "request"
const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: true })

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
	console.log('params.checkLike :', params.checkLike);

	if (params.checkLike) {
		let data = postMd.addLikeById(params)
		data.then(result => {
			let data = result
			res.json({ status_code: 200, data })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	}
	else{
		let data = postMd.minusLikeById(params)
		data.then(result => {
			let data = result
			res.json({ status_code: 200, data })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	}
})
router.get("/leech", async (req, res) => {
	
	const getLinkPhim14 = url => {
		return new Promise((resolve, reject) => {
			request(url, (error, response, body) => {
				let link = ''
				if (!error && response.statusCode == 200) {
					let mUrl = body.match(/<iframe\ssrc="(https:[^"]+)"/i)
					if (mUrl && mUrl[1]) {
						link = mUrl[1]
					}
				}
				resolve(link)
			})
		})
	}

	const synccode = async () => {
		let url =
		"http://phim14.net/xem-phim/ban-cung-la-nguoi_are-you-human-too.9257.298264.html"
		let link = await getLinkPhim14(url)
		console.log('link :', link);
	}
	synccode()
})
module.exports = router
