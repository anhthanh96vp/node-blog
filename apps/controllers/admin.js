import express from "express"
const router = express.Router()

// import users để kết nối đến database
import userMd from "../models/user_md"

//import post để kết nối tới database
import postMd from "../models/post_md"

// import helper để đẩy password đã được mã hóa
import helper from "../helpers/helper"

// import validateEmail để định dạng dữ liệu đầu vào
import { validateEmail } from "../helpers/validation"

//-----------------------------------------------------

//PHẦN SIGN UP

router.get("/signup", (req, res) => {
	res.render("admin/user/signup", { data: {} })
})

//post dữ liệu từ form đăng ký lên và xử lý
router.post("/signup", (req, res) => {
	// Lấy user từ request body khi đẩy dữ liệu
	let user = req.body

	//Xử lý khi submit nếu trường email không đúng định dạng thì err
	if (!validateEmail(user.email)) {
		res.render("admin/user/signup", {
			data: {
				err: "Hãy nhập đúng định dạng email"
			}
		})
	}

	//Xử lý khi submit nếu nhập lại password không giống nhau thì err
	if (
		user.password.length < 6 ||
		(user.password != user.repassword && validateEmail(user.email))
	) {
		res.render("admin/user/signup", {
			data: {
				err: "Password nhập vào không chính xác hoặc dưới 6 ký tự"
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
	// 		last_name: user.lastname,
	// 		created_at: new Date(),
	// 		updated_at: new Date()
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
	// 			res.render("admin/user/signup", {
	// 				err: "Gặp lỗi khi insert dữ liệu lên DB"
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
				last_name: user.lastname,
				created_at: new Date(),
				updated_at: new Date()
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
					res.render("admin/user/signup", {
						data: {
							err: "Gặp lỗi khi insert dữ liệu lên DB"
						}
					})
				})
		})

		//NẾU bên hashPassword trả về reject thì catch sẽ chạy
		.catch(err => {
			res.render("admin/user/signup", {
				data: {
					err: "Mã hóa password thất bại"
				}
			})
		})
})

//----------------------------------------------

// PHẦN SIGN IN
router.get("/signin", (req, res) => {
	res.render("admin/user/signin", { data: {} })
})

// TRUY VẤN EMAIL XÉT PASSWORD ĐỂ ĐĂNG NHẬP

router.post("/signin", (req, res) => {
	//Lấy params từ request body
	let params = req.body

	//Check lỗi nếu không đúng định dạng email bằng file validate
	if (!validateEmail(params.email)) {
		res.render("admin/user/signin", {
			data: { err: "Hãy nhập đúng định dạng email" }
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
		// 			res.render("admin/user/signin", {
		// 				data: {
		// 					err: "Password nhập vào không chính xác"
		// 				}
		// 			})
		// 		}
		// 	})
		// } else {
		// 	res.render("admin/user/signin", {
		// 		data: { err: "Email bạn nhập vào không chính xác" }
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
							// đẩy thông tin user vào session
							req.session.user = user
							console.log(req.session.user)

							res.redirect("/admin/")
						} else {
							res.render("admin/user/signin", {
								data: {
									err: "Password nhập vào không chính xác"
								}
							})
						}
					})
					.catch(err => {
						res.render("admin/user/signin", {
							data: {
								err: "Lỗi trong quá trình phân tích password"
							}
						})
					})
			})
			.catch(err => {
				res.render("admin/user/signin", {
					data: {
						err: "Email nhập vào không chính xác"
					}
				})
			})
	}
})

//----------------------------------------------

// PHẦN POST ALL PAGE ADMIN

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /admin
router.get("/", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập

	if (req.session.user) {
		postMd
			.getAllPosts()
			//Promise vào resolve trả data posts
			.then(posts => {
				let data = {
					posts: posts,
					err: false
				}
				res.render("admin/dashboard", {
					data: data
				})
			})
			//Xử lý lỗi nếu promise vào reject
			.catch(err => {
				res.render("admin/dashboard", {
					data: {
						err: "Lấy dữ liệu bài đăng lỗi"
					}
				})
			})
	} else {
		res.redirect("/admin/signin")
	}
})

//------------------------------------------------

// PHẦN ADD NEW POST

router.get("/post/new", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	if (req.session.user) {
		res.render("admin/post/new", {
			data: {
				err: false
			}
		})
	} else {
		res.redirect("/admin/signin")
	}
})

//Tương tự như bên post user
router.post("/post/new", (req, res) => {
	let params = req.body

	//check lỗi
	if (
		params.title.trim() == 0 ||
		params.content.trim() == 0 ||
		params.author.trim() == 0
	) {
		res.render("admin/post/new", {
			data: { err: "Bạn phải nhập đầy đủ các trường" }
		})
	} else {
		let date = new Date()
		params.created_at = date
		params.updated_at = date

		let data = postMd.addPost(params)

		data.then(result => {
			res.redirect("/admin")
		}).catch(err => {
			res.render("admin/post/new", {
				data: { err: "Không thể post bài đăng" }
			})
		})
	}
})

//------------------------------------------------------

// PHẦN EDIT POST

router.get("/post/edit/:id", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập

	if (req.session.user) {
		let params = req.params
		let id = params.id
		let data = postMd.getPostById(id)

		if (data) {
			data.then(posts => {
				//chọn thằng post giống id đầu tiên
				let post = posts[0]

				let data = {
					post: post,
					err: false
				}

				res.render("admin/post/edit", {
					data: data
				})
			}).catch(err => {
				let data = {
					err: "Không có bài viết nào như vậy"
				}
				res.render("admin/post/edit", {
					data: data
				})
			})
		} else {
			let data = { err: "Không có bài viết nào như vậy" }
			res.render("admin/post/edit", {
				data: data
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})

//------------------------------------------------------

//PHẦN UPDATE POST

router.put("/post/edit/", (req, res) => {
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

//------------------------------------------------------

// PHẦN DELETE POST

router.delete("/post/delete", (req, res) => {
	let post_id = req.body.id

	let data = postMd.deletePost(post_id)

	if (data) {
		data.then(result => {
			res.json({ status_code: 200 })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	} else {
		res.json({ status_code: 404 })
	}
})

//------------------------------------------------------

// CHUYỂN HƯỚNG TRANG admin/post --> admin

router.get("/post", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập

	if (req.session.user) {
		res.redirect("/admin")
	} else {
		res.redirect("/admin/signin")
	}
})

// DANH SÁCH USER
router.get("/user", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	if (req.session.user) {
		let data = userMd.getAllUsers()

		data.then(users => {
			let data = {
				users: users,
				err: false
			}

			res.render("admin/user/user", { data: data })
		}).catch(err => {
			let data = {
				err: "Could not get user info"
			}
			res.render("admin/user/user", { data: data })
		})
	} else {
		res.redirect("/admin/signin")
	}
})
module.exports = router
