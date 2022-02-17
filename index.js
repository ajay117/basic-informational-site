const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = process.env.port || 3000;

const server = http.createServer((req, res) => {
  // if(req.url === '/') {
  //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err,data) => {
  //         if(err) throw err;
  //         res.writeHead(200, {'Content-Type': 'text/html'});
  //         res.write(data);
  //         return res.end();
  //     })
  // }
  // if(req.url === '/about.html') {
  //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err,data) => {
  //         if(err) throw err;
  //         res.writeHead(200, {'Content-Type': 'text/html'});
  //         res.write(data);
  //         return res.end();
  //     })
  // }
  // if(req.url === '/contact-me.html') {
  //     fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err,data) => {
  //         if(err) throw err;
  //         res.writeHead(200, {'Content-Type': 'text/html'});
  //         res.write(data);
  //         return res.end();
  //     })
  // }

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  let extName = path.extname(filePath);

  let contentType = "text/html";

  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  if (contentType === "text/html" && extName === "") filePath += ".html";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        //Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data, "utf-8");
        });
      } else {
        //Some server error
        res.writeHead(500);
        res.end(`Server Error : ${err.code}`);
      }
    } else {
      //Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log("Server is listening at port: " + PORT);
});
