var express = require("express");
var _ = require("underscore");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var data = [
	{
		id: 1,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: false,
		date: "7 May"
	},
	{
		id: 2,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: false,
		date: "6 May"
	},
	{
		id: 3,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: false,
		date: "5 May"
	},
	{
		id: 4,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: false,
		date: "4 May"
	},
	{
		id: 5,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: true,
		date: "3 May"
	},
	{
		id: 6,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: true,
		date: "2 May"
	},
	{
		id: 7,
		subject: "hello",
		content: "<div>hello content</div>",
		isRead: true,
		date: "2 May"
	}
]

app.get('/playerinbox/emails/snippets', function (req, res) {
	var page = req.query.page;

	var response = [];

	for(var i = 0; i < data.length; i++){
		if(i >= ((page - 1) * 5) && i < (page * 5)){
			response.push(data[i]);
		}
	}

	res.send([{"total": 2}, response]);
});

app.get('/playerinbox/email/:id', function (req, res) {
	var id = req.params.id;

	for(var i = 0; i < data.length - 1; i++){
		if(id.toString() == data[i].id.toString()){
			res.send(data[i]);
		}
	}
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});