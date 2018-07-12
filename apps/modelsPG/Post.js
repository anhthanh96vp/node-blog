import { sequelize } from "../databases/databases"
import Sequelize from "sequelize"
//Tạo  các trường và kiểu dữ liệu
export const Post = sequelize.define(
	//connect tới database table lists
	"post",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING
		},
		content: {
			type: Sequelize.TEXT
		},
		author: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE
		},
		updated_at: {
			type: Sequelize.DATE
		}
	},
	{
		// không tự động tạo 2 trường updatedAt, createdAt (updatedAt, createdAt)
		timestamps: false
	}
)
