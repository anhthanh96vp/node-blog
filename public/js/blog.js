// Tooltip skill
$(function() {
	$('[data-toggle="tooltip"]').tooltip()
})

// Check like
const url = `${location.protocol}//${document.domain}:${location.port}`
var checkLike = true
$(".like_post").click(function(e) {
	let id = $("input[name=id]").val()
	let like_post = $("input[name=like_post]").val()
	let data = { checkLike: checkLike, id: id, like_post: like_post }
	console.log("id :", id)
	$.ajax({
		url: url + "/blog/posts/checklike",
		type: "PUT",
		data: data,
		dataType: "json",
		success: function(res) {
			res.status_code == 200
			location.reload()
		},
		error: function(res, error) {
			res.status_code == 500
		}
	})

	return (checkLike = !checkLike)
})

//Posts string limit

$(document).ready(function() {
	for (let i in $(".post_limit")) {
		if ($(".post_limit")[i].innerText.length > 155) {
			$(".post_limit")[i].innerText =
				$(".post_limit")[i].innerText.slice(0, 155) + "..."
		}
	}
})
