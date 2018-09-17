import express from "express"
import config from "config"
import mysql from "mysql"
import bodyParser from "body-parser"
import socketio from "socket.io"
//Sử dụng cái này phải cài đặt express
import session from "express-session"
const MySQLStore = require('express-mysql-session')(session);

import passport from "passport";

const app = express()


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

// CẤU HÌNH BODY PARSER
//cấu hình bodyParser ra dạng json
app.use(bodyParser.json())

//để nhận được dữ liệu từ form data post lên và xử lý nó
app.use(bodyParser.urlencoded({ extended: true }))

// CẤU HÌNH EXPRESS-SESSION KẾT HỢP VỚI CONFIG
const options = {
	host: config.get("mysql.host"),
	user: config.get("mysql.user"),
	password: config.get("mysql.password"),
	database: config.get("mysql.database"),
	port: config.get("mysql.port")
}
let sessionStore = new MySQLStore(options);

app.set("trust proxy", 1) // trust first proxy
app.use(
	session({
		key: config.get("key"),
		secret: config.get("secret_key"), // mã bí mật bên file config
		resave: false,
		saveUninitialized: true,
		//cookie là false có thể cho mình save lữ diệu vào session
		cookie: { secure: false },
		store: sessionStore
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
const port = process.env.PORT || config.get("server.port")
// Tạo cổng kết nối
//Cài thêm module config
let server = app.listen(port, host, () => {
	console.log(`Server is running: ${host} ${port}`)
})

// Tích hợp socketio vào ứng dụng
let io = socketio(server)

//import file socketcontrol và truyền biến io vào xử lý
// import socketcontrol from "./apps/common/socketcontrol"
let socketcontrol = require("./apps/common/socketcontrol")(io)

