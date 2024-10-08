const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const moment = require("moment");
const xlsx = require("xlsx");
const CalendarPieceValidator = require("../class/CalendarPieceValidator");

const getJSONFromExcel = async () => {
    try {
        const buffer = await fs.readFile("./data/sceances.xlsx");
        const workBook = xlsx.read(buffer, { type: "buffer" });

        const sheetName = workBook.SheetNames[0];
        const worksheet = workBook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(worksheet, {
            raw: false,
        });

        const combo = [];

        for (let i = 0; i < data.length; ++i) {
            const formattedDate = new Date(data[i].date);

            if (isNaN(formattedDate)) {
                continue;
            }

            const check = new CalendarPieceValidator(
                formattedDate,
                data[i].places
            );

            combo.push(await check.getObject());
        }

        console.log(combo);
        return combo;
    } catch (error) {
        console.error("Erreur lors de la conversion du fichier Excel :", error);
    }
};

router.get("/", async (req, res) => {
    try {
        const data = await getJSONFromExcel();

        res.json({ error: null, data: data });
    } catch (err) {
        console.error(err);
        res.json({ error: true, data: null });
    }
});

module.exports = router;
