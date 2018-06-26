const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const PORT = process.env.PORT || 3000

const app = express()

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (welcomeMessage) => {
	return welcomeMessage.toUpperCase();
})

app.use((req, res, next) => {
	now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`
	console.log(log);

	fs.appendFile("server.log", log + "\n", (err) => {
		if (err) {
			console.log("Unable to log into the file");
		}
	});

	next();
});

// The site is under maintenance
app.use((req, res, next) => {
	res.render("maintenance.hbs");
})

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
	// res.send("<h1>Hello, World</h1>");
	// res.send({
	// 	name: "Ravi",
	// 	likes: [
	// 		"chess",
	// 		"cricket",
	// 		"swimming"
	// 	]
	// });

	res.render("home.hbs", {
		pageTitle: "Home",
		welcomeMessage: "Welcome to Sajjanpur"
	})
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About"
	});
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`)
})