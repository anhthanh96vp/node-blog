import express from "express"
const router = express.Router()

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /blog

router.get("/", (req, res) => {
	res.render("blog/index")
})

module.exports = router
