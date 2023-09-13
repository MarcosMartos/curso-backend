const { log } = require("console");
const http = require("http");

const server = http.createServer();

server.listen(8080, () => {
  console.log("Escuchando el puerto 8080");
});
