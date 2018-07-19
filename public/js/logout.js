const Logout = () => {
	console.log('đâs')
	$(".info__logout").click(function(e) {
		const url = `${location.protocol}//${document.domain}:${location.port}`
		$.ajax({
			url: url + "/admin/logout",
			type: "GET",
			dataType: "json",
			success: result => {
					console.log("success")
					location.replace(`${url}/blog`);
			},
			error: (res, error) => {
				
					console.log("err")
					alert(`error = ${JSON.stringify(error)}`)
			
			}
		})
	})
}

$(document).ready(() => {
	Logout()
})
