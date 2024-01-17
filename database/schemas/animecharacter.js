const mongoose = require('mongoose');


const animeCharacterSchema = new mongoose.Schema({
	name: {
		type: mongoose.SchemaTypes.String,
	},
	skill: {
		type:mongoose.SchemaTypes.Number
	},
	imageUrl: {
		type:mongoose.SchemaTypes.String
	},
	createdAt: {
		type: mongoose.SchemaTypes.Date,
		required: true,
		default:new Date()
	}
})

module.exports = mongoose.model('anime', animeCharacterSchema);