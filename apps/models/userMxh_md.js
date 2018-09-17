//import sử dụng hàm connect bên file database
import db from "../common/database"
const conn = db.getConnection()

//Hàm insert user lên database
const addUser = user => {
    if (user) {
        let promise = new Promise((resolve, reject) => {
            let query = conn.query(
                "INSERT INTO users_mxh SET ?",
                user,
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
        return promise
    }
    return false
}
const checkUserById = mxh => {
    if (mxh) {
        let promise = new Promise((resolve, reject) => {
            // hàm xử lý khí connect server sau đó select user trên database
            let query = conn.query(
                //SHOW bảng users tìm các email giống với email nhập vào
                "SELECT * FROM users_mxh WHERE ?",
                { mxh: mxh },
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        //Trả về mảng chứa data users đều có email như nhập vào
                        resolve(result)
                    }
                }
            )
        })
        return promise
    }
    return false
}
module.exports = { addUser, checkUserById }
