const Skill = () => {
	const url = `${location.protocol}//${document.domain}:${location.port}`
	$.ajax({
		url: url + "/blog/skills",
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
}

$(document).ready(() => {
	Skill()
})
