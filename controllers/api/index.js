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

// dining
app.get("/dining/hours", dining.Hours);
app.get("/dining/menus", dining.Menus);
// waitz
app.get("/waitz", waitz.Waitz);

app.listen(3000, () => {
  console.log("# API server started!");
});