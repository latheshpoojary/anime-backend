const mongoose = require('mongoose');


const goggleUserSchema = new mongoose.Schema({

	googleID: {
		type: mongoose.SchemaTypes.String,
		required:true
	},
	createdAt: {
		type: mongoose.SchemaTypes.Date,
		required: true,
		default:new Date()
	}
})

module.exports = mongoose.model('goggle', goggleUserSchema);