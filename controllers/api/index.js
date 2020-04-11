/*
* [controllers/api]
* Start express listener
* Routers
*/

"use strict";

const express = require("express");

const dining = require("./dining");
const waitz = require("./waitz");

const app = express();
app.use(express.json());
let api = express.Router();
app.use("/api", api);

app.listen(3000, () => {
  console.log("# API server started!");
});

// dining
api.get("/dining/hours", dining.Hours);
api.get("/dining/menus", dining.Menus);
// waitz
api.get("/waitz", waitz.Waitz);