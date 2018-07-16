Skill = () => {
	bindEvent = () => {
		$.ajax({
			url: "test2",
			type: "GET",
			dataType: "json",
			success: result => {
				console.log("result :", result)
			},
			error: error => {
				console.log("error :", error)
			}
		})
	}
	bindEvent()
}

$(document).ready(() => {
	new Skill()
})
