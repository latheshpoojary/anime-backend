const { Router } = require('express');
const { verify } = require('jsonwebtoken');
const enviroments = require('../enviroments/enviroments');
const animecharacter = require("../database/schemas/animecharacter");

const router = Router();

const narutoCharcter = [
	{
		Name: "Naruto",
		skill: 100,
	},
	{
		Name: "Sasuke",
		skill:95,
	},
	{
		Name: "Sasuke",
		skill: 85,
	},
	{
		Name: "Sasuke",
		skill: 90,
	},
	{
		Name: "Sikamaru",
		skill: 80,
	},
	{
		Name: "Itachi",
		skill: 100,
	},
	{
		Name: "Zaraya",
		skill: 100,
	},
]

router.use((req, res, next) => {
	const headerContent = req.headers.authorization;
	console.log(headerContent);
	const token = headerContent.split(" ")[1];
	if (!token) res.status(400).json({ "msg": "Token not found" })
	try {
		const isValidToken = verify(token, enviroments.secret);
		if (isValidToken) {
		req.isAuthenticated = true;
		return next();
	}
	} catch (error) {
		res.status(401).json({
			"message":"Invalid user"
		})
	}

})

router.get("/",async (req, res) => {
		// res.cookie('visited', true, {
		// 	maxAge:1000
		// })
	
	// const { skill } = req.query;
	// const parsedSkill = parseInt(skill);
	// if (!isNaN(parsedSkill)) {
	// const filteredNaruto = narutoCharcter.filter((e) => e.skill <= parsedSkill);
	// 	res.send(filteredNaruto);
	// }
	// else {
	// 	res.send(narutoCharcter);
	// }
	const charcterDetails = await animecharacter.find();
	res.json(charcterDetails);

});

router.get('/:name/:skill', (req, res) => {
	const { name, skill } = req.params;
	
	let obj = narutoCharcter.find((character) => character.Name === name && character.skill === parseInt(skill));
	if (!obj) {
		obj = "NO DATA FOUND";
	}
	res.send(obj);
})

router.post("/", async (req, res) => {
	console.log("request body", req.body);
	const { name, imageUrl } = req.body;
	const skill = parseInt(req.body.skill);
	const newcharacter= animecharacter.create({
		name,
		skill,
		imageUrl
	});
	(await newcharacter).save();
	narutoCharcter.push(req.body);
	res.json({"msg":"Successfully created"});
})

// router.get("/naruto",)

module.exports = router;