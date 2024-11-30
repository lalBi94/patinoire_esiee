import axios from "axios";

/**
 * Supprimer une sceance
 * @param {number} id_sceance L'id de la sceance
 * @return {Promise<{data: null, error: string|null}>}
 */
export const deleteSceance = async (id_sceance) => {
    const formData = new FormData();
    formData.append("id", id_sceance);

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/deleteSceance`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};

/**
 * Supprimer un personne d'une sceance
 * @param {number} id_bro L'id de la personne
 * @param {number} id_sceance L'id de la sceance ou faut tej la personne
 * @return {Promise<{data: null, error: string|null}>}
 */
export const deleteSomeone = async (id_bro, id_sceance) => {
    const formData = new FormData();
    formData.append("id_bro", id_bro);
    formData.append("id_sceance", id_sceance);

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/participant/removeParticipant`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};

/**
 * Envoyer une demande de cotisation sur le serveur
 * @param {string} identite Nom prenom de la personne
 * @param {string} promo La promo de la personne
 * @param {string} email Le mail de la personne
 * @param {string} tel Le numero de tel de la personne
 * @return {Promise<{data: null, error: string|null}>}
 */
export const submitRegCotisant = async (identite, promo, email, tel) => {
    const formData = new FormData();
    formData.append("identite", identite);
    formData.append("promo", promo);
    formData.append("email", email);
    formData.append("tel", tel);

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/cotisation/addCotisant`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};

/**
 * Recuperer la liste des cotisants
 * @return {Promise<{data: []|null, error: string|null}>}
 */
export const getCotisant = async () => {
    const req = await axios.get(
        `${import.meta.env.VITE_API_URL}/cotisation/retreiveCotisant/`
    );

    return req.data;
};

/**
 * Recuperer la liste des demandes de cotisation
 * @return {Promise<{data: []|null, error: string|null}>}
 */
export const getAskCotisant = async () => {
    const req = await axios.get(`${import.meta.env.VITE_API_URL}/cotisation/`);
    return req.data;
};

/**
 * Ajouter une sceance
 * @param {Date} date La date sous new Data()
 * @param {number} places Le nombre de place
 * @return {Promise<{data: null, error: string|null}>}
 */
export const addSceance = async (date, places) => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("places", places);

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/addSceance`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};

/**
 * Recuperer les sceances
 * @return {Promise<{data: []|null, error: string|null}>}
 */
export const getSceance = async () => {
    const req = await axios.get(`${import.meta.env.VITE_API_URL}/calendar`);

    for (let e in req.data.data) {
        const formData = new FormData();
        formData.append("id", req.data.data[e].id);

        const data = await axios.post(
            `${import.meta.env.VITE_API_URL}/participant/participantBySeance`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        req.data.data[e] = {
            ...req.data.data[e],
            participants: data.data.data,
        };
    }

    return req.data.data;
};

/**
 * Supprimer une demande de cotisation
 * @param {number} id Id de la personne qui demande a cotiser
 * @return {{data: null, error: string|null}}
 */
export const refuseSomeone = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/cotisation/removeAskCotisation`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};

/**
 * Accepter une demande de cotisation
 * @param {number} id Id de la personne qui demande a cotiser
 * @param {string} identite Id de la personne qui demande a cotiser
 * @param {string} email Id de la personne qui demande a cotiser
 * @param {string} tel Id de la personne qui demande a cotiser
 * @param {string} promo Id de la personne qui demande a cotiser
 * @param {0|1} cgu Id de la personne qui demande a cotiser
 * @param {0|1} knowledge Id de la personne qui demande a cotiser
 * @param {0|1} club_rules Id de la personne qui demande a cotiser
 * @return {{data: null, error: string|null}}
 */
export const acceptSomeone = async (
    id,
    identite,
    email,
    tel,
    promo,
    cgu,
    knowledge,
    club_rules
) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("identite", identite);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("promo", promo);
    formData.append(
        "questions",
        JSON.stringify({
            cgu,
            knowledge,
            club_rules,
        })
    );

    const req = await axios.post(
        `${import.meta.env.VITE_API_URL}/cotisation/addCotisant`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        }
    );

    return req.data;
};
