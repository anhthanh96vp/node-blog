function Skill() {
	//Đường link localhost
	const url = `${location.protocol}//${document.domain}:${location.port}`
	$(".skill_edit").click(function(e) {
		let params = {
			id: $(".id")
				.val()
				.trim(),
			title: $(".title")
				.val()
				.trim(),
			html_icon: $(".html_icon")
				.val()
				.trim()
		}

		//Đường link localhost

		$.ajax({
			url: url + "/admin/skills/edit",
			type: "PUT",
			data: params,
			dataType: "json",
			success: function(res) {
				if (res && res.status_code == 200) {
					location.reload()
				}
			},
			error: function(error) {
				if (res && res.status_code == 500) {
					alert(`error = ${JSON.stringify(error)}`)
				}
			}
		})
	})

	$(".skill_delete").click(function(e) {
		//Lấy số id của post
		let skill_id = $(this).attr("skill_id")

		$.ajax({
			url: url + "/admin/skills/delete",
			type: "DELETE",
			data: { id: skill_id },
			dataType: "json",
			success: res => {
				if (res && res.status_code == 200) {
					location.reload()
				}
			},
			error: error => {
				if (res && res.status_code == 404) {
					alert(`error = ${JSON.stringify(error)}`)
				}
			}
		})
	})
}

$(document).ready(() => {
	Skill()
})
