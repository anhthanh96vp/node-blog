function Post() {
	const bindEvent = () => {
		$(".post_edit").click(function(e) {
			let params = {
				id: $(".id").val(),
				title: $(".title").val(),
				content: tinymce.get("content").getContent(),
				author: $(".author").val()
			}
			let baseUrl =
				location.protocol + "//" + document.domain + ":" + location.port
			console.log("baseUrl :", baseUrl)

			$.ajax({
				url: `${baseUrl} /admin/post/edit`,
				type: "PUT",
				data: params,
				dataType: "json",
				success: res => {
					if (res && res.status_code == 200) {
						location.reload()
					}
				}
			})
		})

		$(".post_delete").click(function(e) {})
	}
	bindEvent()
}

$(document).ready(() => {
	new Post()
})
