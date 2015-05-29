var express = require("express");
var _ = require("underscore");
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); 
    ('OPTIONS' == req.method) ? res.send(200) : next(); 
};

app.use(allowCrossDomain);

app.use(function(err, req, res, next) {
	res.end(500);
});

var data = [
	{
		id: 1,
		subject: "hello",
		content: "<div><img src='http://placehold.it/100x100'>hello content</div>",
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
		date: "1 May"
	}
]


app.get('/OrchardLocal/api/PlayerInboxWidget/GetMessages', function (req, res, next) {
	var page = req.query.page;

	var response = [];

	for(var i = 0; i < data.length; i++){
		if(i >= ((page - 1) * 5) && i < (page * 5)){
			response.push(data[i]);
		}
	}

	res.send([{"total": 2}, response]);
});

app.get('/OrchardLocal/api/PlayerInboxWidget/GetMessage', function (req, res, next) {
	var id = req.query.id;

	var response = data;

	for(var i = 0; i < data.length; i++){
		if(id.toString() ==  data[i].id.toString()){
			response.splice(i, 1);
		}
	}

	res.send(response);
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});