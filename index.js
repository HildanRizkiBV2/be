const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learn",
});

database.connect((err) => {
  if (err) throw err;
  console.log("mysql connected...");
});

app.get("/api/v1/user", function (req, res) {
  console.log("mysql request...");
  database.query("SELECT * FROM user", (err, rows) => {
    if (err) throw err;
    res.json({
      success: true,
      messange: "Get data successfully",
      data: rows,
    });
  });
});

app.post("/api/v1/product", function (req, res) {
  const { title, price } = req.body;
  database.query(
    `INSERT INTO product ( id, title, price) VALUES (null, '${title}', '${price}')`,
    [title, price],
    (err, rows) => {
      if (err) throw err;
      res.json({
        success: true,
        messange: "Post data successfully",
        data: rows,
      });
    }
  );
});

app.get("/api/v1/product", function (req, res) {
  database.query("SELECT * FROM product", (err, rows) => {
    if (err) throw err;
    res.json({
      success: true,
      messange: "Get data successfully",
      data: rows,
    });
  });
});

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});
