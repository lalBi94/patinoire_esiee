const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const express_rateL = require("express-rate-limit");
const SQLLiteInteractor = require("../class/SQLLiteInteractor");
const sli_connect = new SQLLiteInteractor("./data/p_e_b.db");

router.post("/participantBySeance", upload.none() , async (req, res) => {
    try {
        const {id} = req.body;
        const data = await sli_connect.getParticipantsBySessionId(id);
        console.log(data, id);
        res.json({error: null, data});
    } catch (err) {
        console.error(err);
        res.json({ error: "Une erreur est survenue !", data: null });
    }
});

module.exports = router;
