const path = require("path");
const express = require("express");
const http = require('http');

const app = express();

const publicPath = path.join(__dirname, "build");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

const server = http.createServer(app);

server.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
    console.log("Server is up!");
});