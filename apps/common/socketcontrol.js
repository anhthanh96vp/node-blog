//export cả file này thành 1 function xử lý
module.exports = io => {
	//tạo biến lưu trữ users
	let usernames = []

	//tạo cổng server lắng nghe client
	io.sockets.on("connection", function(socket) {
		console.log("Have a new user connected")

		//Sự kiện adduser

		socket.on("adduser", username => {
			socket.username = username
			usernames.push(username)

			var data = {
				server: "SERVER",
				message: "Bạn đã tham gia phòng chat"
			}

			socket.emit("update_message", data)

			var data = {
				server: "SERVER",
				message: `${username} đã tham gia phòng chat`
			}

			socket.broadcast.emit("update_message", data)
		})
	})
}
