// Tooltip skill
$(function() {
	$('[data-toggle="tooltip"]').tooltip()
})

//Posts string limit
for (let i in $(".post_limit")) {
	if ($(".post_limit")[i].text().trim().length > 155) {
		$(".post_limit")[i].text() =
			$(".post_limit")[i].innerText.slice(0, 155) + "..."
	}
}
