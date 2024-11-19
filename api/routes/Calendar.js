const express = require("express");
const router = express.Router();
const CalendarPieceValidator = require("../class/CalendarPieceValidator");
const multer = require("multer");
const upload = multer();
const express_rateL = require("express-rate-limit");
const SQLLiteInteractor = require("../class/SQLLiteInteractor");
const sli_connect = new SQLLiteInteractor("./data/p_e_b.db");

const limiter = express_rateL({
    windowMs: 30 * 60 * 1000,
    max: 1,
    message: "Votre appareil a deja reserve cette sceance.",
});

//router.use("/take", limiter);
router.post("/take", upload.none(), async (req, res) => {
    try {
        const { identity, cotisantOf, tel, email, sceance_id } = req.body;

        await sli_connect.decrementPlace(sceance_id);
        await sli_connect.addParticipant(identity, email, tel, sceance_id);

        console.log(identity, cotisantOf, tel, email, sceance_id);
        res.json({ error: null, data: null });
    } catch (err) {
        console.error(err);
        res.json({ error: "Impossible de reserver !", data: null });
    }
});

router.post("/addSceance", upload.none(), async (req, res) => {
    try {
        const { date, places } = req.body;

        await sli_connect.addSession(date, places);

        res.json({ error: null, data: null });
    } catch (err) {
        console.error(err);
        res.json({ error: "Impossible de creer une sceance !", data: null });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await sli_connect.getAllSessions();
        console.log(data);
        res.json({ error: null, data });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

module.exports = router;
