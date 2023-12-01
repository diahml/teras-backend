const { createUser, getUserbyID, getUsers, updateUser, deleteUser } = require("./user.controller");
const router = require("express").Router();

//registration
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserbyID);
router.patch("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;

