function User() {
	//Đường link localhost
	const url = `${location.protocol}//${document.domain}:${location.port}`
	$(".user_edit").click(function(e) {
		let params = {
			id: $("#id")
				.val()
				.trim(),
			password: $("#password")
				.val()
				.trim(),
			repassword: $("#repassword")
				.val()
				.trim(),
			first_name: $("#first_name")
				.val()
				.trim(),
			last_name: $("#last_name")
				.val()
				.trim()
		}
		//Đường link localhost

		$.ajax({
			url: url + "/admin/users/edit",
			type: "PUT",
			data: params,
			dataType: "json",
			success: function(res) {
				if (res && res.status_code == 200) {
					location.reload()
				}
			},
			error: function(res, error) {
				if (res && res.status_code == 500) {
					console.log(`error = ${JSON.stringify(error)}`)
				}
			}
		})
	})

	$(".user_delete").click(function(e) {
		//Lấy số id của post
		if (confirm("You may want to delete") == true) {
			let user_id = $(this).attr("user_id")
			$.ajax({
				url: url + "/admin/users/delete",
				type: "DELETE",
				data: { id: user_id },
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
	User()
})
