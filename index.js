const express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", function () {});

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");

	/**
	 * Socket Message Structure
	 * LAMP
	 * {
	 * 	section: Number,
	 *	lamp: {	
				on: Boolean
				hue: Number
		 		sat: Number
				bri: Number,
		 },
	 * }
	 */

	socket.on("lamp", (msg) => {
		console.log(msg);
		client.publish(
			"section/" + msg.section + "/lamp",
			JSON.stringify(msg.lamp)
		);
	});

	/**
	 * Socket Message Structure
	 * SONG
	 * {
	 * 	section: Number,
	 *	songId: Number
	 * }
	 */
	socket.on("song", (msg) => {
		console.log(msg);
		client.publish(
			"section/" + msg.section + "/song",
			JSON.stringify(msg.songId)
		);
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
