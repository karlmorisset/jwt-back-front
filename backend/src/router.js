const express = require("express");

const { UserController } = require("./controllers");
const authorization = require("./middleware/authorization");
const isAdmin = require("./middleware/isAdmin");
const router = express.Router();

// Routes Auth
router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.post("/users/logout", authorization, UserController.logout);

// Routes Users
router.get("/users", authorization, isAdmin, UserController.browse);

module.exports = router;
