const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log', log + '\n');
next();
});

// app.use((req, res, next) => {
// res.render('maintain.hbs',{
// 	titlePage: `We'll be right back`
// });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
//res.send('<h2>Hello node </h2>');
// res.send({
// 	name: 'bhavya',
// 	class: 'grad',
// 	likes:['music', 'surfing']
// });
res.render('home.hbs', {
	pageTitle: 'Home Page',
	welcomeMsg: 'Welcome to the page',
	// currentYear: new Date().getFullYear()
})
});

app.get('/about', (req,res) => {
// res.send("about the page");
res.render('about.hbs', {
 pageTitle: 'about the page',
 // currentYear: new Date().getFullYear()
});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'string is unable to load'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port} `);
});