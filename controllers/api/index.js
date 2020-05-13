/*
* [controllers/api]
* Start express listener
* Routers
*/

"use strict";

const express = require("express");

const moduleList = ["auth", "info", "user", "student", "dining", "waitz", "professor", "course"];
let modules = {};

// load all modules
for (let m of moduleList) {
  modules[m] = require(`./${m}`);
}

const app = express();
app.use(express.json());
app.disable("x-powered-by"); // hide express identity
let api = express.Router(); // router
app.use("/api", api); // register with middleware

app.listen(3000, () => {
  console.log("# API server started!");
});

// info
api.get("/info/:key", modules.info.Query);
// dining
api.get("/dining/hours", modules.dining.Hours);
api.get("/dining/menus/:dc", modules.dining.Menus);
// waitz
api.get("/waitz", modules.waitz.Waitz);
// professor
api.get("/professor/:name", modules.professor.Query);
// course
api.get("/course/:q", modules.course.Search);
api.get("/course/:q/:id", modules.course.Query);
// user
api.post("/user", modules.user.Login);
api.put("/user/:random", modules.auth.UserAuth, modules.user.Bind);
// student data
api.get("/student/schedule", modules.auth.UserAuth, modules.student.Schedule);
api.get("/student/registration", modules.auth.UserAuth, modules.student.Registration);