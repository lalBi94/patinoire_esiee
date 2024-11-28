const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SQLLiteInteractor = require("./class/SQLLiteInteractor");

(async () => {
    const sli = new SQLLiteInteractor("./data/p_e_b.db");
    await sli.createTable();
    console.log("on :sqlite3");
})();

const corsOption = {
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:5173"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET, POST",
    allowedHeaders: ["Content-Type", "Authorization"],
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

const participant = require("./routes/Participant");
app.use("/participant", participant);

const cotisation = require("./routes/Cotisation");
app.use("/cotisation", cotisation);

app.listen(5002, () => {
    console.log("on :5002");
});
