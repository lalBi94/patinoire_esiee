class CalendarPieceValidator {
    constructor(date, places) {
        try {
            this.date = date;
            this.places = places;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     *
     * @return {string}
     */
    getDate() {
        return this.date;
    }

    /**
     * Recuperer le nombre de place disponible
     * @return {number}
     */
    getPlaces() {
        return this.places;
    }

    async getObject() {
        try {
            return { places: this.places, date: this.date };
        } catch (err) {
            console.error(err);
        }
    }
}

// eslint-disable-next-line no-undef
module.exports = CalendarPieceValidator;
