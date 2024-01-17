const { Router } = require('express');
const router = Router();

router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send(401);
}) 


router.get('/', (req, res) => {
	console.log(req)

	const { heroes } = req.session;
	if (!heroes) {
		res.send("You don't have any session");
	} else {
		res.send(heroes);
	}
})

router.post('/', (req, res) => {
	const { name, skill } = req.body;
	const character = { name, skill };
	const { heroes } = req.session;
	if (heroes) {
		req.session.heroes.chacter.push(character);
	} else {
		req.session.heroes = {
			chacter :[character],
		}
	}
	// res.send(201);
	res.send(req.session);

})

module.exports = router;