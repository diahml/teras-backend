const { createForum, getForum, getForumAndRepliesByID, reply, getRepliesbyForumID, getForumbyID } = require("./forum.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation"); //used in the route that require login

router.get("/:id", getForumbyID);


router.get("/", getForum);

router.post("/", checkToken, createForum);


router.post("/:forum_id", checkToken, reply);

module.exports = router;