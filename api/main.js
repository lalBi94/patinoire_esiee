const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SQLLiteInteractor = require("./class/SQLLiteInteractor");

(async () => {
    const sli = new SQLLiteInteractor("./data/p_e_b.db");
    await sli.createTable()
})();

// (async () => {
//     const sli = new SQLLiteInteractor('./data/p_e_b.db');
//
//     try {
//         console.log(await sli.createTable());
//
//         const sessions = [
//             { "id": 1, "date": "2024-11-14T09:00:00.000Z", "places": 10 },
//             { "id": 2, "date": "2024-11-15T12:00:00.000Z", "places": 20 },
//             { "id": 3, "date": "2024-11-16T15:30:00.000Z", "places": 5 },
//             { "id": 4, "date": "2024-11-17T18:45:00.000Z", "places": 8 },
//             { "id": 5, "date": "2024-11-18T22:00:00.000Z", "places": 15 }
//         ];
//
//         for (const session of sessions) {
//             const addedSession = await sli.addSession(session.date, session.places);
//             console.log(`Session ajoutée: ID = ${addedSession.id}, Date = ${new Date(session.date).toISOString()}, Places = ${session.places}`);
//         }
//
//     } catch (err) {
//         console.error('Erreur:', err);
//     } finally {
//         await sli.close();
//     }
// })();


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

const participant = require("./routes/Participant");
app.use("/participant", participant);


app.listen(5002, () => {
    console.log("on :5002");
});
