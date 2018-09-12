import express from "express"
const router = express.Router()

//import post để kết nối tới database
import userMd from "../models/user_md"
import postMd from "../models/post_md"
import skillMd from "../models/skill_md"
import projectMd from "../models/project_md"
// import helper để đẩy password đã được mã hóa
import helper from "../helpers/helper"

// import validateEmail để định dạng dữ liệu đầu vào
import { validateEmail } from "../helpers/validation"

import passport from "passport";

//-----------------------------------------------------


router.get("/login/facebook", passport.authenticate("facebook"));
router.get(
	"/login/facebook/callback",
	passport.authenticate("facebook", {
		// successRedirect: "/",
		failureRedirect: "/admin/signup",
		scope: ["email"],
		session: false
	}),
	function (req, res) {
		// req.session.user = req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);












//-----------------------------------------------------

//PHẦN SIGN UP



router.get("/signup", (req, res) => {
	res.render("admin/users/signup", { data: {} })
})

//post dữ liệu từ form đăng ký lên và xử lý
router.post("/signup", (req, res) => {
	// Lấy user từ request body khi đẩy dữ liệu
	let user = req.body

	//Xử lý khi submit nếu trường email không đúng định dạng thì err
	if (!validateEmail(user.email.trim())) {
		res.render("admin/users/signup", {
			data: {
				err: "Hãy nhập đúng định dạng email"
			}
		})
	}

	//Xử lý khi submit nếu nhập lại password không giống nhau thì err
	if (
		user.password.trim().length < 6 ||
		(user.password != user.repassword && validateEmail(user.email))
	) {
		res.render("admin/users/signup", {
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
			let date = new Date()
			user = {
				email: user.email,
				password: codePassword.trim(),
				first_name: user.firstname,
				last_name: user.lastname,
				avatar: user.avatar,
				created_at: date,
				updated_at: date
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
					res.render("admin/users/signup", {
						data: {
							err: "Gặp lỗi khi insert dữ liệu lên DB"
						}
					})
				})
		})

		//NẾU bên hashPassword trả về reject thì catch sẽ chạy
		.catch(err => {
			res.render("admin/users/signup", {
				data: {
					err: "Mã hóa password thất bại"
				}
			})
		})
})

//----------------------------------------------
// PHẦN SIGN IN
router.get("/signin", (req, res) => {
	res.render("admin/users/signin", { data: {} })
})

// TRUY VẤN EMAIL XÉT PASSWORD ĐỂ ĐĂNG NHẬP

router.post("/signin", (req, res) => {
	//Lấy params từ request body
	let params = req.body

	//Check lỗi nếu không đúng định dạng email bằng file validate
	if (!validateEmail(params.email.trim())) {
		res.render("admin/users/signin", {
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
							req.session.save()
							console.log(req.session.user)
							res.redirect("/admin/")
						} else {
							res.render("admin/users/signin", {
								data: {
									err: "Password nhập vào không chính xác"
								}
							})
						}
					})
					.catch(err => {
						res.render("admin/users/signin", {
							data: {
								err: "Lỗi trong quá trình phân tích password"
							}
						})
					})
			})
			.catch(err => {
				res.render("admin/users/signin", {
					data: {
						err: "Email nhập vào không chính xác"
					}
				})
			})
	}
})

router.get("/logout", (req, res) => {
	req.session.destroy()
	res.json({
		result: "Success",
		data: {},
		description: `Đăng xuất thành công`
	})
})

//----------------------------------------------

// PHẦN RENDER DỮ LIỆU TRANG ADMIN

// Vì đã được Include bên file index.js nên đường dẫn ở đây sẽ là /admin
router.get("/", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập

	if (req.session.user) {
		let users = userMd.getAllUsers()
		let posts = postMd.getAllPosts()
		let skills = skillMd.getAllSkills()
		let projects = projectMd.getAllProjects()
		let userLogin = req.session.user

		Promise.all([users, skills, projects, posts])
			.then(data => {
				res.render("admin/dashboard", {
					result: true,
					data: data,
					userLogin: userLogin,
					message: "Successfull"
				})
			})
			.catch(reason => {
				res.render("admin/dashboard", {
					result: false,
					userLogin: userLogin,
					data: {},
					message: `Err = ${reason}`
				})
			})
	} else {
		res.redirect("/admin/signin")
	}
})

//------------------------------------------------

// RENDER TRANG CHI TIẾT ADM

router.get("/users", async (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		try {
			let users = await userMd.getAllUsers()
			let data = { users: users, err: false }

			res.render("admin/users/detailUsers", {
				data: data,
				userLogin: userLogin
			})
		} catch (err) {
			res.render("admin/users/detailUsers", {
				userLogin: userLogin,
				err: `Dữ liệu không tìm thấy hoặc đã bị xóa`
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})
router.get("/skills", async (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		try {
			let skills = await skillMd.getAllSkills()
			let data = { skills: skills, err: false }

			res.render("admin/skills/detailSkills", {
				data: data,
				userLogin: userLogin
			})
		} catch (err) {
			res.render("admin/skills/detailSkills", {
				userLogin: userLogin,
				err: `Dữ liệu không tìm thấy hoặc đã bị xóa`
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})
router.get("/projects", async (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		try {
			let projects = await projectMd.getAllProjects()
			let data = { projects: projects, err: false }

			res.render("admin/projects/detailProjects", {
				data: data,
				userLogin: userLogin
			})
		} catch (err) {
			res.render("admin/projects/detailProjects", {
				userLogin: userLogin,
				err: `Dữ liệu không tìm thấy hoặc đã bị xóa`
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})
router.get("/posts", async (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		try {
			let posts = await postMd.getAllPosts()
			let data = { posts: posts, err: false }
			res.render("admin/posts/detailPosts", {
				data: data,
				userLogin: userLogin
			})
		} catch (err) {
			res.render("admin/posts/detailPosts", {
				userLogin: userLogin,
				err: `Dữ liệu không tìm thấy hoặc đã bị xóa`
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})

//0------------------------------------------------

// PHẦN USER

router.get("/users/edit/:id", async (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	if (req.session.user) {
		let params = req.params
		let id = params.id
		let userLogin = req.session.user
		try {
			let users = await userMd.getUserById(id)
			let user = users[0]
			res.render("admin/users/edit", {
				user: user,
				userLogin: userLogin,
				err: false
			})
		} catch (err) {
			res.render("admin/users/edit", {
				userLogin: userLogin,
				err: "Không có user nào như vậy"
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})

// update user

router.put("/users/edit/", async (req, res) => {
	let params = req.body
	let id = params.id
	let userLogin = req.session.user
	if (
		params.password.trim().length < 6 ||
		params.first_name.trim() == "" ||
		params.last_name.trim() == ""
	) {
		res.render(`admin/users/edit`, {
			userLogin: userLogin,
			user: {},
			err: "Bạn phải nhập đầy đủ các trường"
		})
	} else if (params.password != params.repassword) {
		res.render("admin/users/edit", {
			userLogin: userLogin,
			user: {},
			err: "Nhập lại password không chính xác"
		})
	} else {
		//mã hóa password
		helper
			.hashPassword(params.password)
			//NẾU bên hashPassword trả về reresolve thì then sẽ chạy
			.then(codePassword => {
				params.password = codePassword
				try {
					let data = userMd.updateUser(params)
					res.json({ status_code: 200 })
				} catch (error) {
					res.json(
						{ status_code: 500 },
						{ err: "Bạn phải nhập đầy đủ các trường" }
					)
				}
			})

			//NẾU bên hashPassword trả về reject thì catch sẽ chạy
			.catch(err => {
				res.render("admin/users/edit", {
					userLogin: userLogin,
					data: {
						err: "Mã hóa password thất bại"
					}
				})
			})
	}
})
//delete user

router.delete("/users/delete", async (req, res) => {
	let user_id = req.body.id
	try {
		let data = userMd.deleteUser(user_id)
		res.json({ status_code: 200 })
	} catch (error) {
		res.json({ status_code: 404 })
	}
})

//-------------------------------------------------

// PHẦN SKILL

router.get("/skills/new", (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		res.render("admin/skills/new", { userLogin: userLogin, err: false })
	} else {
		res.redirect("/admin/signin")
	}
})

//post skills
router.post("/skills/new", (req, res) => {
	let params = req.body
	//check lỗi
	let userLogin = req.session.user
	if (params.title.trim() == 0 || params.html_icon.trim() == 0) {
		res.render("admin/skills/new", {
			userLogin: userLogin,
			err: "Bạn phải nhập đầy đủ các trường"
		})
	} else {
		let date = new Date()
		params.created_at = date
		params.updated_at = date

		let data = skillMd.addSkill(params)

		data.then(skill => {
			res.redirect("/admin/skills")
		}).catch(err => {
			res.render("admin/skills/new", {
				result: false,
				userLogin: userLogin,
				data: {},
				message: `Err = ${err}`
			})
		})
	}
})

// edit skills

router.get("/skills/edit/:id", async (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	// if (req.session.user) {
	let userLogin = req.session.user
	let params = req.params
	let id = params.id
	try {
		let skills = await skillMd.getSkillById(id)
		let skill = skills[0]
		res.render("admin/skills/edit", {
			skill: skill,
			userLogin: userLogin,
			err: false
		})
	} catch (err) {
		res.render("admin/skills/edit", {
			userLogin: userLogin,
			err: "Không có icons nào như vậy"
		})
	}
	// } else {
	// 	res.redirect("/admin/signin")
	// }
})

// update skills

router.put("/skills/edit", async (req, res) => {
	let params = req.body
	let userLogin = req.session.user
	if (params.title.trim() == "" || params.html_icon.trim() == "") {
		res.render("admin/skills/edit/" + params.id, {
			userLogin: userLogin,
			skill: {},
			err: "Hãy điền đẩy đủ thông tin"
		})
	} else {
		try {
			let data = await skillMd.updateSkill(params)
			// res.json({ status_code: 200, data})
			res.render("admin/skills/detailSkills", {
				userLogin: userLogin,
				skill: {},
				data: data,
				err: false
			})
		} catch (error) {
			// res.json({ status_code: 500 })
			res.render("admin/skills/edit/" + params.id, {
				userLogin: userLogin,
				skill: {},
				err: "Hãy điền đẩy đủ thông tin"
			})
		}
	}
})

//delete skills

router.delete("/skills/delete", async (req, res) => {
	let skill_id = req.body.id
	try {
		let data = skillMd.deleteSkill(skill_id)
		res.json({ status_code: 200 })
	} catch (error) {
		res.json({ status_code: 404 })
	}
})
//-------------------------------------------------
// PHẦN PROJECT

router.get("/projects/new", (req, res) => {
	if (req.session.user) {
		let userLogin = req.session.user
		res.render("admin/projects/new", { userLogin: userLogin, err: false })
	} else {
		res.redirect("/admin/signin")
	}
})

//post project
router.post("/projects/new", (req, res) => {
	let params = req.body
	let userLogin = req.session.user
	//check lỗi
	if (
		params.title.trim() == 0 ||
		params.intro.trim() == 0 ||
		params.description.trim() == 0 ||
		params.link_project.trim() == 0
	) {
		res.render("admin/projects/new", {
			userLogin: userLogin,
			err: "Bạn phải nhập đầy đủ các trường"
		})
	} else {
		if (params.link_images.trim() == 0) {
			params.link_images = "/static/imgs/user.png"
		}
		let date = new Date()
		params.created_at = date
		params.updated_at = date

		let data = projectMd.addProject(params)

		data.then(project => {
			res.redirect("/admin/projects")
		}).catch(err => {
			res.render("admin/projects/new", {
				result: false,
				userLogin: userLogin,
				data: {},
				message: `Err = ${err}`
			})
		})
	}
})

router.get("/projects/edit/:id", async (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	if (req.session.user) {
		let userLogin = req.session.user
		let params = req.params
		let id = params.id

		try {
			let projects = await projectMd.getProjectById(id)
			let project = projects[0]
			res.render("admin/projects/edit", {
				project: project,
				userLogin: userLogin,
				err: false
			})
		} catch (err) {
			res.render("admin/projects/edit", {
				project: {},
				userLogin: userLogin,
				err: "Không có project nào như vậy"
			})
		}
	} else {
		res.redirect("/admin/signin")
	}
})

// update project

router.put("/projects/edit/", async (req, res) => {
	let params = req.body
	let userLogin = req.session.user
	if (
		params.title.trim() == 0 ||
		params.intro.trim() == 0 ||
		params.description.trim() == 0 ||
		params.link_project.trim() == 0
	) {
		res.render("admin/projects/edit", {
			userLogin: userLogin,
			project: {},
			err: "Bạn phải nhập đầy đủ các trường"
		})
	} else {
		if (params.link_images.trim() == 0) {
			params.link_images = "/static/imgs/user.png"
		}
		try {
			let data = await projectMd.updateProject(params)
			res.json({ status_code: 200 })
		} catch (error) {
			res.json({ status_code: 500 })
		}
	}
})

//delete project

router.delete("/projects/delete", async (req, res) => {
	let project_id = req.body.id

	try {
		let data = projectMd.deleteProject(project_id)
		res.json({ status_code: 200 })
	} catch (error) {
		res.json({ status_code: 404 })
	}
})

//--------------------------------------------

// PHẦN POST

// add post
router.get("/posts/new", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập
	if (req.session.user) {
		let userLogin = req.session.user
		res.render("admin/posts/new", {
			data: {
				err: false
			},
			userLogin: userLogin
		})
	} else {
		res.redirect("/admin/signin")
	}
})

//Tương tự như bên post user
router.post("/posts/new", (req, res) => {
	let params = req.body
	let userLogin = req.session.user
	//check lỗi
	if (
		params.title.trim() == 0 ||
		params.content.trim() == 0 ||
		params.author.trim() == 0
	) {
		console.log(userLogin)
		res.render("admin/posts/new", {
			userLogin: userLogin,
			data: { err: "Bạn phải nhập đầy đủ các trường" }
		})
	} else {
		let date = new Date()
		params.created_at = date
		params.updated_at = date
		params.avatar = userLogin.avatar
		let data = postMd.addPost(params)

		data.then(result => {
			res.redirect("/admin/posts")
		}).catch(err => {
			res.render("admin/posts/new", {
				data: { err: "Không thể post bài đăng" }
			})
		})
	}
})

//------------------------------------------------------

// edit post

router.get("/posts/edit/:id", (req, res) => {
	// check xem nếu đã đăng nhập, lưu dữ liệu vào session thì được quyền truy cập

	if (req.session.user) {
		if (req.session.user) {
			let userLogin = req.session.user
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

					res.render("admin/posts/edit", {
						data: data,
						userLogin: userLogin
					})
				}).catch(err => {
					let data = {
						err: "Không có bài viết nào như vậy"
					}
					res.render("admin/posts/edit", {
						data: data,
						userLogin: userLogin
					})
				})
			} else {
				let data = { err: "Không có bài viết nào như vậy" }
				res.render("admin/posts/edit", {
					data: data,
					userLogin: userLogin
				})
			}
		} else {
			res.redirect("/admin/signin")
		}
	} else {
		res.redirect("/admin/signin")
	}
})

//------------------------------------------------------

//PHẦN UPDATE POST

router.put("/posts/edit/", (req, res) => {
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

// delete post

router.delete("/posts/delete", (req, res) => {
	let post_id = req.body.id

	let data = postMd.deletePost(post_id)

	if (data) {
		data.then(result => {
			console.log("res :", res)
			res.json({ status_code: 200 })
		}).catch(err => {
			res.json({ status_code: 404 })
		})
	} else {
		res.json({ status_code: 404 })
	}
})

//----------------------------------------------------

module.exports = router
