/*
* [controllers/api]
* Start express listener
* Routers
*/

"use strict";

const express = require("express");

const auth = require("./auth");

const info = require("./info");
const user = require("./user");
const dining = require("./dining");
const waitz = require("./waitz");
const professor = require("./professor");
const course = require("./course");

const app = express();
app.use(express.json());
app.disable("x-powered-by"); // hide express identity
let api = express.Router(); // router
app.use("/api", auth.Auth, api); // register with middleware

app.listen(3000, () => {
  console.log("# API server started!");
});

// info
api.get("/info/:key", info.Query);
// student data
api.get("/user/schedule",user.Schedule);
api.get("/user/registration",user.Registration);
// dining
api.get("/dining/hours", dining.Hours);
api.get("/dining/menus/:dc", dining.Menus);
// waitz
api.get("/waitz", waitz.Waitz);
// professor
api.get("/professor/:name", professor.Query);
// course
api.get("/course", course.Search);
api.get("/course/:code", course.Query);