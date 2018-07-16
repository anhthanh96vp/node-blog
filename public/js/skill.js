let getAllSkills = []
const Skill = () => {
	const url = `${location.protocol}//${document.domain}:${location.port}`
	$.ajax({
		url: url + "/blog/getAllSkills",
		type: "GET",
		dataType: "json",
		success: result => {
			result.data.forEach(skill => {
				$(".skills").append(
					`<li class="list-inline-item">${skill.html_icon}</li>`
				)
			})
			return result
		},
		error: error => {
			$(".skills").append(
				`<li style="color:red" class="list-inline-item">${"Không thể lấy được dữ liệu"}</li>`
			)
			return error
		}
	})

	// $.ajax({
	// 	url: url + "/blog/postSkills",
	// 	type: "POST",
	// 	dataType: "json",
	// 	success: result => {
	// 		return result
	// 	},
	// 	error: error => {
	// 		return error
	// 	}
	// })

	// $.ajax({
	// 	url: url + "/blog/editSkills",
	// 	type: "PUT",
	// 	dataType: "json",
	// 	success: result => {
	// 		return result
	// 	},
	// 	error: error => {
	// 		return error
	// 	}
	// })
}

$(document).ready(() => {
	Skill()
})
