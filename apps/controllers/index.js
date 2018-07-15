import express from "express"

// Khởi tạo router
const router = express.Router()

// Include 2 file admin và blog
router.use("/admin", require(__dirname + "/admin"))
router.use("/blog", require(__dirname + "/blog"))
router.use("/todo", require(__dirname + "/todo"))

// Tạo 1 router chung cho cả hệ thống
router.get("/", (req, res) => {
	res.redirect("blog")
})

router.get("/chat", (req, res) => {
	res.render("chat/chat")
})

// Exports nó ra
module.exports = router
