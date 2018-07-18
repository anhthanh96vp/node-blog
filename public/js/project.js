function Project() {
	//Đường link localhost
	const url = `${location.protocol}//${document.domain}:${location.port}`
	$(".project_edit").click(function(e) {
		let params = {
			id: $("input[name=id]")
				.val()
				.trim(),
			title: $("input[name=title]")
				.val()
				.trim(),
			intro: $("textarea[name=intro]")
				.val()
				.trim(),
			description: $("textarea[name=description]")
				.val()
				.trim(),
			link_project: $("textarea[name=link_project]")
				.val()
				.trim(),
			link_images: $("textarea[name=link_images]")
				.val()
				.trim()
		}
		$.ajax({
			url: url + "/admin/projects/edit",
			type: "PUT",
			data: params,
			dataType: "json",
			success: res => {
				if (res && res.status_code == 200) {
					// location.reload()
				}
			},
			error: (res, error) => {
				if (res && res.status_code == 500) {
					alert(`error = ${JSON.stringify(error)}`)
				}
			}
		})
	})

	$(".project_delete").click(function(e) {
		//Lấy số id của post
		if (confirm("You may want to delete") == true) {
			let project_id = $(this).attr("project_id")
			console.log("project_id :", project_id)

			$.ajax({
				url: url + "/admin/projects/delete",
				type: "DELETE",
				data: { id: project_id },
				dataType: "json",
				success: res => {
					if (res && res.status_code == 200) {
						location.reload()
					}
				},
				error: (res, error) => {
					if (res && res.status_code == 404) {
						alert(`error = ${JSON.stringify(error)}`)
					}
				}
			})
		}
	})
}

$(document).ready(() => {
	Project()
})
