require("dotenv").config();
<<<<<<< HEAD
const axios = require("axios");
=======
const axios = require('axios');
>>>>>>> f4ce2cbe861dad8b339aa370ae9b65b3485d75f4
const express = require('express');
const app = express();
const predictionRouter = require("./api/prediction/prediction.router");
const userRouter = require("./api/users/user.router");
const forumRouter = require("./api/forums/forum.router");

app.use(express.json());

app.use("/prediction", predictionRouter);
app.use("/forum", forumRouter);
app.use("/", userRouter);



const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
    console.log(`server is up and running on : ${port}`);
});