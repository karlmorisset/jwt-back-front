const express = require("express");

const { UserController } = require("./controllers");
const { authorization, isAdmin } = require("./controllers/UserController");

const router = express.Router();

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
// TODO add the JWT middlewares to the `/users` route
router.get("/users", authorization, isAdmin, UserController.browse);
// TODO modify the `logout` method in UserController
router.get("/users/logout", UserController.logout);

router.put("/users/:id", UserController.edit);
router.delete("/users/:id", UserController.delete);

module.exports = router;
