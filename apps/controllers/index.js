import express from "express";

// Khởi tạo router
const router = express.Router();

// Include 2 file admin và blog
router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));

// Tạo 1 router chung cho cả hệ thống
router.get("/", (req, res) => {
	res.render("test");
});

// Exports nó ra
module.exports = router;
// export { router }
