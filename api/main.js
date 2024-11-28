const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SQLLiteInteractor = require("./class/SQLLiteInteractor");
const path = require("path");

(async () => {
    const sli = new SQLLiteInteractor("./data/p_e_b.db");
    await sli.createTable();
    console.log("on :sqlite3");
})();

// TODO: NE PAS OUBLIER DE REGLER LE DOMAIN !
const corsOption = {
    origin: "*",
    credentials: true,
    methods: "GET, POST",
    allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(express.static(path.resolve(__dirname, "dist")));

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

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(5002, () => {
    console.log("on :5002");
});
