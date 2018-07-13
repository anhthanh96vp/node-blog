let socket = io.connect("http://localhost:8000")

//Thông báo đã connect đến server
socket.on("connect", () => {
	console.log("User is connecting to server")

	//Sự kiện hỏi tên người dùng khi connect đến server
	let username = prompt("What is your name?")
	//emit là hàm gửi dữ liệu bằng 1 sự kiện

	//Gửi username bằng sự kiện adduser
	if (username.length != 0) socket.emit("adduser", username)
	else socket.emit("adduser", "Anonymous")
})

//Lắng nghe update_message event emit
socket.on("updateMessage", data => {
	// Lắng nghe sự kiện emit update_message và lấy được data
	//Tạo thêm 1 thẻ li bên trong div ul có id conversation
	$("#conversation").append(
		`<li><b> ${data.sender}: </b> ${data.message}</li>`
	)
})

// Gửi tin nhắn
$("#btn-chat").click(e => {
	//Lấy value input là content mesage
	let message = $("#message").val()

	//Gán nó lại giá trị là rỗng
	$("#message").val("")

	//message != rỗng thì đẩy message qua hàm sendMessage
	if (message.trim().length != 0) {
		socket.emit("sendMessage", message)
	}
})

//Chặn submit từ form
$("form").submit(() => {
	return false
})

$("#message").keypress(e => {
	if (e.which == 13) $("#btn-chat").trigger("click")
})
