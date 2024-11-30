import axios from "axios";

/**
 * Envoyer une demande de cotisation
 * @param {string} identite Nom prenom de la personne
 * @param {string} promo La promo de la personne
 * @param {string} email Le mail de la personne
 * @param {string} tel Le numero de tel de la personne
 * @param {0|1} cgu Id de la personne qui demande a cotiser
 * @param {0|1} knowledge Id de la personne qui demande a cotiser
 * @param {0|1} club_rules Id de la personne qui demande a cotiser
 * @return {Promise<{data: null, error: string|null}>}
 */
export const sendAskCotisation = async (
    identite,
    email,
    tel,
    promo,
    cgu,
    knowledge,
    club_rules
) => {
    try {
        const formData = new FormData();
        formData.append("identite", identite);
        formData.append("email", email);
        formData.append("tel", tel);
        formData.append("promo", promo);
        formData.append(
            "questions",
            JSON.stringify({
                knowledge: knowledge ? 1 : 0,
                club_rules: club_rules ? 1 : 0,
                cgu: cgu ? 1 : 0,
            })
        );

        const req = await axios.post(
            `${import.meta.env.VITE_API_URL}/cotisation/ask`,
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
