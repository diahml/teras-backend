require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./api/users/user.router");


app.use(express.json());

//registration
app.use("/", userRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and running on : ${port}`);
});