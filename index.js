import express from "express"
import config from "config"
import bodyParser from "body-parser"
import socketio from "socket.io"
//Sử dụng cái này phải cài đặt express
import session from "express-session"

const app = express()

// CẤU HÌNH BODY PARSER
//cấu hình bodyParser ra dạng json
app.use(bodyParser.json())

//để nhận được dữ liệu từ form data post lên và xử lý nó
app.use(bodyParser.urlencoded({ extended: true }))

// CẤU HÌNH EXPRESS-SESSION
app.set("trust proxy", 1) // trust first proxy
app.use(
	session({
		secret: config.get("secret_key"), // mã bí mật bên file config
		resave: false,
		saveUninitialized: true,
		//cookie là false có thể cho mình save lữ diệu vào session
		cookie: { secure: true }
	})
)

// CẤU HÌNH EJS
//đường dẫn đến thư mục views
app.set("views", __dirname + "/apps/views")

//Lệnh này set để nó hiểu tất cả file có đuôi ejs trong thư mục views
//đều được hiểu là template
app.set("view engine", "ejs")

// CẤU HÌNH STATIC
app.use("/static", express.static(__dirname + "/public"))

// Import thư mục controllers
const controllers = require(__dirname + "/apps/controllers")

// Include controllers
app.use(controllers)

const host = config.get("server.host")
const portMYSQL = config.get("server.portMYSQL")
// Tạo cổng kết nối
//Cài thêm module config
let server = app.listen(portMYSQL, host, () => {
	console.log(`Server is running: ${host} ${portMYSQL}`)
})

// Tích hợp socketio vào ứng dụng
let io = socketio(server)

//import file socketcontrol và truyền biến io vào xử lý
// import socketcontrol from "./apps/common/socketcontrol"
let socketcontrol = require("./apps/common/socketcontrol")(io)
