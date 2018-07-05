//Ở đây sẽ viết những hàm giải mã password

//module bcrypt sử dụng để mã hóa password ( hash password )
import bcrypt from "bcrypt";
import config from "config";

//Hàm mã hóa password
const hashPassword = password => {
	// saltRounds là độ dài bên cofig là salt
	let saltRounds = config.get("salt");

	//sử dụng saltRounds làm tham số để tạo salt cho sẵn
	let salt = bcrypt.genSaltSync(saltRounds);

	//salt sử dụng để mã hóa password với hàm hash
	let hash = bcrypt.hashSync(password, salt);

	return hash;
};

const comparePassword = (password, hash) => {
	//So sánh password từ req body với password trên database
	return bcrypt.compareSync(password, hash); // true là bằng nhau, false là khác nhau
};

module.exports = { hashPassword, comparePassword };
