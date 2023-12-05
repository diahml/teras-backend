const { createUser, getUserbyID, getUsers, updateUser, login, readPrediction, deleteUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation"); //used in the route that require login


//read prediction
router.get("/prediction", readPrediction);

//registration (cuma yg createUser)
router.post("/register", createUser);
//user information by id
router.get("/:id", getUserbyID);

//unused
router.patch("/profile/update", updateUser);
router.get("/", getUsers);

router.delete("/", deleteUser);

//login so they can have access to post in discussion room
router.post("/login", login);

// router.post("/discussion", checkToken, postDiscussion);



module.exports = router;

