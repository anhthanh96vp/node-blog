const Logout = () => {
	$(".info__logout").click(function(e) {
		const url = `${location.protocol}//${document.domain}:${location.port}`
		$.ajax({
			url: url + "/admin/logout",
			type: "GET",
			dataType: "json",
			success: result => {
				console.log("success")
				location.replace(`${url}/blog`)
			},
			error: (res, error) => {
				console.log("err")
				alert(`error = ${JSON.stringify(error)}`)
			}
		})
	})
}
// Search
const searchTable = () => {
	let input = document.getElementById("search_table").value.toUpperCase()
	let tab = $(".is_table")
	for (i = 0; i < tab.length; i++) {
		let keyword = tab[i].getElementsByTagName("b")[0]
		if (keyword.innerHTML.toUpperCase().indexOf(input) > -1) {
			tab[i].style.display = ""
		} else {
			tab[i].style.display = "none"
		}
	}
}

$(document).ready(() => {
	Logout()
	searchTable()
})
