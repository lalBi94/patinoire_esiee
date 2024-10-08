const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use((req, res, next) => {
    console.log("\n↓↓↓↓↓↓↓↓↓", req.ip || req.connection.remoteAddress);
    next();
});

const calendar = require("./routes/Calendar");
app.use("/calendar", calendar);

app.listen(5002, () => {
    console.log("on :5002");
});
