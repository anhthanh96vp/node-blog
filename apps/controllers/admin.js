import express from "express"
const router = express.Router()

// import users để kết nối đến database
import userMd from "../models/user"

// import helper để đẩy password đã được mã hóa
import helper from "../helpers/helper"

// import validateEmail để định dạng dữ liệu đầu vào
import { validateEmail } from "../helpers/validation"

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /admin
router.get("/", (req, res) => {
	res.json({
		message: "This is Admin Page"
	})
})

router.get("/signup", (req, res) => {
	res.render("signup", { data: {} })
})

//post dữ liệu từ form đăng ký lên và xử lý
router.post("/signup", (req, res) => {
	// Lấy user từ request body khi đẩy dữ liệu
	let user = req.body

	//Xử lý khi submit nếu trường email không đúng định dạng thì error
	if (!validateEmail(user.email)) {
		res.render("signup", {
			data: {
				error: "Hãy nhập đúng định dạng email"
			}
		})
	}

	//Xử lý khi submit nếu nhập password không giống nhau thì error
	if (user.password != user.repassword && validateEmail(user.email)) {
		res.render("signup", {
			data: {
				error: "Nhập lại password cho chính xác"
			}
		})
	}

	//Khởi tạo trường insert lên Database

	// 	// * KIỂU ĐỒNG BỘ

	// 	//password đã được mã hóa bên file helper
	// 	let codePassword = helper.hashPassword(user.password);

	// 	//sau đó đẩy vào object json chuẩn bị đẩy lên database
	// 	user = {
	// 		email: user.email,
	// 		password: codePassword,
	// 		first_name: user.firstname,
	// 		last_name: user.lastname
	// 	};

	// 	//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
	// 	let result = userMd.addUser(user);

	// 	//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
	// 	//Vì hàm addUser sử dụng promise nên phải sử dụng then catch mới có thể sử dụng được data
	// 	//then là thành công, catch là bắt lỗi
	// 	result
	// 		.then(data => {
	// 			//Signup Thành công thì nhảy sang signin để có thể đăng nhập
	// 			res.redirect("/admin/signin");
	// 		})
	// 		.catch(err => {
	// 			res.render("signup", {
	// 				error: "Gặp lỗi khi insert dữ liệu lên DB"
	// 			});
	// 		});
	// });

	// *KIỂU BẤT ĐỒNG BỘ

	helper
		.hashPassword(user.password)

		//NẾU bên hashPassword trả về reresolve thì then sẽ chạy
		.then(codePassword => {
			user = {
				email: user.email,
				password: codePassword.trim(),
				first_name: user.firstname,
				last_name: user.lastname
			}

			//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
			let result = userMd.addUser(user)

			//Nếu user đẩy lên khác user nhập vào thì lỗi, thành công thì success
			//Vì hàm addUser sử dụng promise nên phải sử dụng then catch mới có thể sử dụng được data
			//then là thành công, catch là bắt lỗi
			result
				.then(data => {
					//Signup Thành công thì nhảy sang signin để có thể đăng nhập
					res.redirect("/admin/signin")
				})
				.catch(err => {
					res.render("signup", {
						data: {
							error: "Gặp lỗi khi insert dữ liệu lên DB"
						}
					})
				})
		})

		//NẾU bên hashPassword trả về reject thì catch sẽ chạy
		.catch(err => {
			res.render("signup", {
				data: {
					error: "Mã hóa password thất bại"
				}
			})
		})
})

router.get("/signin", (req, res) => {
	res.render("signin", { data: {} })
})

// TRUY VẤN EMAIL XÉT PASSWORD ĐỂ ĐĂNG NHẬP

router.post("/signin", (req, res) => {
	//Lấy params từ request body
	let params = req.body

	//Check lỗi nếu không đúng định dạng email bằng file validate
	if (!validateEmail(params.email)) {
		res.render("signin", {
			data: { error: "Hãy nhập đúng định dạng email" }
		})
	} else {
		// //**KIỂU ĐỒNG BỘ

		// //Kích hoạt hàm này bằng tham số params.email từ request body
		// //Có tác dụng tìm kiếm email giống với email nhập vào, kết quả là data
		// let data = userMd.getUserByEmail(params.email)
		// if (data) {
		// 	data.then(users => {
		// 		//trả về mảng users có email giống params.email
		// 		//chọn ra user đầu tiên
		// 		let user = users[0]
		// 		//So sánh password từ req.body với password phía server đã đc mã hóa
		// 		//Trong đó params.password là từ req.body
		// 		//user.password là  lấy từ trên database
		// 		let status = helper.comparePassword(
		// 			params.password,
		// 			user.password
		// 		)
		// 		if (status) {
		// 			res.redirect("/admin/")
		// 		} else {
		// 			// req.session.user = user;
		// 			res.render("signin", {
		// 				data: {
		// 					error: "Password nhập vào không chính xác"
		// 				}
		// 			})
		// 		}
		// 	})
		// } else {
		// 	res.render("signin", {
		// 		data: { error: "Email bạn nhập vào không chính xác" }
		// 	})
		// }

		//**BẤT ĐỒNG BỘ

		//Kích hoạt hàm này bằng tham số params.email từ request body
		//Có tác dụng tìm kiếm email giống với email nhập vào, kết quả là data
		userMd
			.getUserByEmail(params.email)
			.then(users => {
				//trả về mảng users có email giống params.email
				//chọn ra user đầu tiên
				let user = users[0]

				//So sánh password từ req.body với password phía server đã đc mã hóa
				//Trong đó params.password là từ req.body
				//user.password là  lấy từ trên database
				helper
					.comparePassword(params.password, user.password)
					.then(status => {
						if (status) {
							res.redirect("/admin/")
						} else {
							res.render("signin", {
								data: {
									error: "Password nhập vào không chính xác"
								}
							})
						}
					})
					.catch(err => {
						res.render("signin", {
							data: {
								error: "Lỗi trong quá trình so sánh pasword"
							}
						})
					})
			})
			.catch(err => {
				res.render("signin", {
					data: { error: "Email nhập vào không chính xác" }
				})
			})
	}
})

module.exports = router
