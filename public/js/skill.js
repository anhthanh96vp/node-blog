function Skill() {
	$(".skill_edit").click(function(e) {
		let params = {
			id: $(".id").val(),
			title: $(".title").val(),
			html_icon: $(".html_icon").val()
		}

		//Đường link localhost
		let url = `${location.protocol}//${document.domain}:${location.port}`
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
		let post_id = $(this).attr("post_id")

		//Đường link localhost
		let url = `${location.protocol}//${document.domain}:${location.port}`

		$.ajax({
			url: url + "/admin/skills/delete",
			type: "DELETE",
			data: { id: post_id },
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
