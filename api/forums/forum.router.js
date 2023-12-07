const { createForum, getForum, getForumbyID, reply } = require("./forum.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation"); //used in the route that require login

router.get("/", getForum);

router.post("/", createForum);

router.get("/:id", getForumbyID);

router.post("/:forum_id", reply);

module.exports = router;