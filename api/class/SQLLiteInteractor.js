const sqlite3 = require("sqlite3").verbose();

class SQLLiteInteractor {
    constructor(dbName) {
        this.db = new sqlite3.Database(dbName, (err) => {
            if (err) {
                console.error("none :sqlite3", err.message);
            }
        });
    }

    createTable() {
        return new Promise((resolve, reject) => {
            const query = `
            CREATE TABLE IF NOT EXISTS sessions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              date INTEGER NOT NULL,
              places INTEGER NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS participants (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              identite TEXT NOT NULL,
              email TEXT NOT NULL,
              numero_tel TEXT NOT NULL,
              session_id INTEGER,
              FOREIGN KEY (session_id) REFERENCES sessions(id)
            );

            CREATE TABLE IF NOT EXISTS demande_cotisations (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              identite TEXT NOT NULL,
              email TEXT NOT NULL,
              tel TEXT NOT NULL,
              promo TEXT NOT NULL,
              knowledge INTEGER NOT NULL,
              club_rules INTEGER NOT NULL,
              cgu INTEGER NOT NULL
            );
          `;

            this.db.exec(query, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(
                        "Tables sessions et participants créées ou déjà existantes."
                    );
                }
            });
        });
    }

    getAskCotisation() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM demande_cotisations`;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    addAskCotisation(identite, email, tel, promo, questions) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO demande_cotisations (identite, email, tel, promo, knowledge, club_rules, cgu) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            this.db.run(
                query,
                [
                    identite,
                    email,
                    tel,
                    promo,
                    questions.knowledge,
                    questions.club_rules,
                    questions.cgu,
                ],
                (err) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve({
                            id: this.lastID,
                            identite,
                            email,
                            tel,
                            promo,
                            questions,
                        });
                    }
                }
            );
        });
    }

    addParticipant(identite, email, numero_tel, sessionId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO participants (identite, email, numero_tel, session_id) VALUES (?, ?, ?, ?)`;
            this.db.run(
                query,
                [identite, email, numero_tel, sessionId],
                function (err) {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve({
                            id: this.lastID,
                            identite,
                            email,
                            numero_tel,
                            sessionId,
                        });
                    }
                }
            );
        });
    }

    getAllSessions() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sessions`;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    const sessions = rows.map((row) => ({
                        id: row.id,
                        date: new Date(row.date),
                        places: row.places,
                    }));
                    resolve(sessions);
                }
            });
        });
    }

    getAllParticipants() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM participants`;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    const participants = rows.map((row) => ({
                        id: row.id,
                        identite: row.identite,
                        email: row.email,
                        numero_tel: row.numero_tel,
                        sessionId: row.session_id,
                    }));
                    resolve(participants);
                }
            });
        });
    }

    getParticipantsBySessionId(sessionId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM participants WHERE session_id = ?`;
            this.db.all(query, [sessionId], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    const participants = rows.map((row) => ({
                        id: row.id,
                        identite: row.identite,
                        email: row.email,
                        numero_tel: row.numero_tel,
                        sessionId: row.session_id,
                    }));
                    resolve(participants);
                }
            });
        });
    }

    addSession(date, places) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO sessions (date, places) VALUES (?, ?)`;
            this.db.run(query, [date, places], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id: this.lastID, date, places });
                }
            });
        });
    }

    updatePlaces(id, newPlaces) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE sessions SET places = ? WHERE id = ?`;
            this.db.run(query, [newPlaces, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`Places mises à jour pour l'ID ${id}.`);
                }
            });
        });
    }

    decrementPlace(id) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE sessions SET places = places - 1 WHERE id = ? AND places > 0`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else if (this.changes === 0) {
                    resolve(`Aucune place à réduire pour l'ID ${id}.`);
                } else {
                    resolve(`Une place a été retirée pour l'ID ${id}.`);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err.message);
                } else {
                    console.log(
                        "Connexion à la base de données SQLite fermée."
                    );
                    resolve();
                }
            });
        });
    }
}

module.exports = SQLLiteInteractor;
