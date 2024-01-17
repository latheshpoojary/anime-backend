const { verify } = require('jsonwebtoken');

function verifyToken(req, res, next) {
	console.log("came inside");
	const { token } = req.body;
	if (!token) return null;
	next();

}

module.exports = {verifyToken};