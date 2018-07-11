//Ở đây sẽ viết những hàm giải mã password

//module bcrypt sử dụng để mã hóa password ( hash password )
import bcrypt from "bcrypt"
import config from "config"

//module q để thực hiện promise

//Hàm mã hóa password
const hashPassword = password => {
	// saltRounds là độ dài bên cofig là salt
	let saltRounds = config.get("salt")

	// //* MÃ HÓA PASSWORD KIỂU ĐỒNG BỘ*

	// //sử dụng saltRounds làm tham số để tạo salt cho sẵn
	// let salt = bcrypt.genSaltSync(saltRounds);

	// //salt sử dụng để mã hóa password với hàm hash
	// let hash = bcrypt.hashSync(password, salt);

	// return hash;

	//* MÃ HÓA KIỂU PASSWORD BẤT ĐỒNG BỘ

	let promise = new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				reject(error)
			} else {
				resolve(hash)
			}
		})
	})

	return promise
}

const comparePassword = (password, hash) => {
	//So sánh password từ req body với password trên database

	//KIỂU ĐỒNG BỘ
	// return bcrypt.compareSync(password, hash); // true là bằng nhau, false là khác nhau

	//BẤT ĐỒNG BỘ
	return bcrypt.compare(password, hash)
}

module.exports = { hashPassword, comparePassword }
