var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", function () {});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("slider", (msg) => {
		console.log(msg);
		client.publish("test", msg);
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
