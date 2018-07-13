//export cả file này thành 1 function xử lý
module.exports = io => {
	//tạo biến lưu trữ users
	let usernames = []

	//tạo cổng server lắng nghe client
	io.sockets.on("connection", socket => {
		console.log("Have a new user connected")

		//Sự kiện adduser thông báo user vào room chat
		socket.on("adduser", username => {
			//Thông báo gửi tới chính bản thân user
			var data = {
				sender: "SERVER",
				message: "Bạn đã tham gia phòng chat"
			}
			//Đẩy data thông báo qua socket.on update_message
			socket.emit("updateMessage", data)

			//Thông báo gửi tới tất cả user đang online trừ bản thân
			var data = {
				sender: "SERVER",
				message: `${username} đã tham gia phòng chat`
			}
			//Đẩy data thông báo qua socket.on update_message
			socket.broadcast.emit("updateMessage", data)

			// -----------------------------------------------------

			//Save vào để sử dụng hàm bên dưới
			socket.username = username
			usernames.push(username)
		})

		//Sự kiện gửi tin nhắn
		socket.on("sendMessage", message => {
			var data = {
				sender: "You",
				message: message
			}

			socket.emit("updateMessage", data)

			var data = {
				sender: socket.username,
				message: message
			}

			socket.broadcast.emit("updateMessage", data)
		})
	})
}
