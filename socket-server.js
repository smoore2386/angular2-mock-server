var ws = require("nodejs-websocket");
var _ = require('lodash');
var sleep = require('sleep');

//simple websocket server to reenact what the action queue does;
var server = ws.createServer((conn) =>{
    console.log("Connection");
    reply();

    
    conn.on("text", (str) => {
	console.log("Received" + str);
	conn.sendText(str.toUpperCase() + "!!!");
    });
    function reply(){
	var messages = [
	    {message: "Returning the message"}];
	
	_.forEach(messages,(msg)=>{
	    conn.sendText(JSON.stringify(msg));
	});

    }
	
    
    conn.on("close", (code, reason) => {
	console.log("Connection WebSocket closed");
    });



}).listen(8001);
