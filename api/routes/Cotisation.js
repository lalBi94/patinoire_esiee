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
    message: "Votre appareil a deja emis une demande de cotisation.",
});

router.get("/", async (req, res) => {
    try {
        const data = await sli_connect.getAskCotisation();
        console.log(data);
        res.json({ error: null, data });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

router.post("/ask", upload.none(), async (req, res) => {
    try {
        const { identite, email, tel, promo, questions } = req.body;
        await sli_connect.addAskCotisation(
            identite,
            email,
            tel,
            promo,
            JSON.parse(questions)
        );

        res.json({ error: null, data: null });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

router.post("/addCotisant", upload.none(), async (req, res) => {
    try {
        const { id, identite, email, tel, promo, questions } = req.body;

        await sli_connect.addCotisant(
            identite,
            email,
            tel,
            promo,
            questions ? JSON.parse(questions) : null
        );

        if (id) {
            await sli_connect.removeAskCotisant(id);
        }

        res.json({ error: null, data: null });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

router.post("/removeAskCotisation", upload.none(), async (req, res) => {
    try {
        const { id } = req.body;
        await sli_connect.removeAskCotisant(id);

        res.json({ error: null, data: null });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

router.get("/retreiveCotisant", async (req, res) => {
    try {
        const data = await sli_connect.getCotisant();
        res.json({ error: null, data });
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

module.exports = router;
