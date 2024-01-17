- Install the express using.
	```
	npm i express
	```

##MiddleWare
- To get all type of request body message from the client ==We have to enable the express types==.
```
server.use(express.json())  //only for json type of request
```
- `MiddleWare` act like a middle between the req and res.

##Route Parameter in Request
- Getting query parameter from the route and adding query parameter to the route
```js
// Route paramter to the route
server.get('/naruto/:name/:skill', (req, res) => {  //here  after the ":" is the query parameter
	const { name,skill } = req.params;  //receiving the query parameter
	let obj = narutoCharcter.find((character) => character.Name === name && character.skill === skill);
	if (!obj) {
		obj = "NO DATA FOUND";
	}
	res.send(obj);
})

```

##Query Parameter in Request
- getting query pramater in the requested url and filtering the result using this query.

```js
router.get("/naruto", (req, res) => {
	const { skill } = req.query;  //getting query parameter
	const parsedSkill = parseInt(skill);  //parsing to make sure the it should be integer
	if (!isNaN(parsedSkill)) {  //double checking for number
	const filteredNaruto = narutoCharcter.filter((e) => e.skill <= parsedSkill);
		res.send(filteredNaruto);
	}
	else {
		res.send(narutoCharcter);
	}
});
```
	
##Difference between the ==Query== and ==Route== parameter
- ==Route Parameter== is used for the resource getting information.
- ==Query parameter== is used for the filter and search.