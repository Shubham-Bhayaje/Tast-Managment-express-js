// const express = require("express");
// const app = express();
// const path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//   res.render("index");
// });

// // app.get("/profile/:id", function (req, res) {
// //   const id = req.params.id;
// //   // res.render("index");
// //   res.send(`hello  ${id}`);
// // });

// app.listen(3000, function () {
//   console.log("express running");
// });

const express = require("express");
const path = require("path");
const app = express();

const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    // Pass the files array to the EJS template
    res.render("index", { files: files });
    console.log(files);
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

app.post("/create", function (req, res) {
  console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.listen(3000, function () {
  console.log("Express server running on port 3000");
});
