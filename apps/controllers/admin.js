import express from "express";
const router = express.Router();

// import users để kết nối đến database
import userMd from "../models/user";

// import helper để đẩy password đã được mã hóa
import helper from "../helpers/helper";

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /admin
router.get("/", (req, res) => {
	res.json({
		message: "This is Admin Page"
	});
});

router.get("/signup", (req, res) => {
	res.render("signup", { data: {} });
});

//post dữ liệu từ form đăng ký lên và xử lý
router.post("/signup", (req, res) => {
	// Lấy user từ request body khi đẩy dữ liệu
	let user = req.body;

	//Xử lý khi submit nếu email rỗng thì error
	if (user.email.trim().length == 0) {
		res.render("signup", {
			data: {
				error: "Email is required"
			}
		});
	}

	//Xử lý khi submit nếu nhập password không giống nhau thì error
	if (user.password != user.repassword && user.email.trim().length != 0) {
		res.render("signup", {
			data: {
				error: "Email is not Match"
			}
		});
	}

	//Khởi tạo trường insert lên Database

	//password đã được mã hóa bên file helper
	let password = helper.hashPassword(user.password);

	user = {
		email: user.email,
		password: password,
		first_name: user.firstname,
		last_name: user.lastname
	};

	//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
	let result = userMd.addUser(user);

	//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
	//Vì hàm addUser sử dụng promise nên phải sử dụng then catch mới có thể sử dụng được data
	//then là thành công, catch là bắt lỗi
	result
		.then(data => {
			//Signup Thành công thì nhảy sang signin để có thể đăng nhập
			res.redirect("/admin/signin");
		})
		.catch(err => {
			res.render("signup", {
				data: { error: "Could not insert user data to DB" }
			});
		});
});

router.get("/signin", (req, res) => {
	res.render("signin", { data: {} });
});

router.post("/signin", (req, res) => {
	//Lấy params từ request body
	let params = req.body;

	//Check lỗi nếu trường email rỗng
	if (params.email.trim() == 0) {
		res.render("signin", { data: { error: "Please enter an email" } });
	} else {
		let data = userMd.getUserByEmail(params.email);
		if (data) {
			data.then(users => {
				let user = users[0];
				let status = helper.comparePassword(
					params.password,
					user.password
				);
				if (status) {
					res.redirect("/admin/");
				} else {
					// req.session.user = user;
					res.render("signin", {
						data: {
							error: "Password Wrong"
						}
					});
				}
			});
		} else {
			res.render("signin", { data: { error: "User not exitst" } });
		}
	}
});

module.exports = router;
