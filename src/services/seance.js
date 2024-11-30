import axios from "axios";

/**
 * Recuperer les sceances
 * @return {Promise<{data: []|null, error: string|null}>}
 */
export const getSeance = async () => {
    const req = await axios.get(`${import.meta.env.VITE_API_URL}/calendar`);
    return req.data;
};

/**
 * Envoyer une demande de cotisation
 * @param {string} identity Nom prenom de la personne
 * @param {string} cotisantOf Cotisant de quoi ?
 * @param {string} email Le mail de la personne
 * @param {string} tel Le numero de tel de la personne
 * @param {0|1} idChoosen Id de la sceance a reserver
 * @return {Promise<{data: null, error: string|null}>}
 */
export const sendReservation = async (
    identity,
    cotisantOf,
    email,
    tel,
    idChoosen
) => {
    try {
        const formData = new FormData();
        formData.append("identity", identity);
        formData.append("cotisantOf", cotisantOf);
        formData.append("email", email);
        formData.append("tel", tel);
        formData.append("sceance_id", idChoosen);

        const req = await axios.post(
            `${import.meta.env.VITE_API_URL}/calendar/take`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        return req.data;
    } catch (err) {
        return null;
    }
};
