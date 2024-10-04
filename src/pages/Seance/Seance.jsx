import "./Seance.scss";
import {
    Stack,
    Typography,
    Box,
    FormControl,
    FormLabel,
    Button,
    Radio,
    Input,
    Divider,
    RadioGroup,
} from "@mui/joy";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import Lydia from "../../assets/images/lydia-logo.webp";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const locales = {
    fr: fr,
};

const messages = {
    today: "Actuel", // ou 'Maintenant'
    previous: "Préc.", // ou 'Avant'
    next: "Suiv.", // ou 'Après'
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    date: "Date",
    time: "Heure",
    event: "Événement",
    allDay: "Toute la journée",
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
    getDay,
    locales,
});

const today = new Date();
const twoMonthsFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
);

export default function Seance() {
    const [identity, setIdentity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [cotisantOf, setCotisantOf] = useState("CLUB");

    const handleIdentity = (e) => {
        setIdentity(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleTel = (e) => {
        setTel(e.target.value);
    };

    const handleCotisantOf = (e) => {
        setCotisantOf(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            identity,
            cotisantOf,
            email,
            tel,
        });
    };

    return (
        <Layout>
            <Stack id="seance-container">
                <Box>
                    <Typography level="h3">
                        S&apos;inscrire a une séance
                    </Typography>
                </Box>

                <form id="seance-form" onSubmit={handleSubmit}>
                    <FormControl className="seance-form-cat">
                        <FormLabel>Cotisant du</FormLabel>

                        <Typography color="danger">
                            Etre cotisant du club ou du BDS est obligatoire !{" "}
                            <Link to="/cotiser">
                                (Cliquez ici si ce n&apos;est pas fait)
                            </Link>
                        </Typography>

                        <RadioGroup
                            onChange={handleCotisantOf}
                            name="cotisant"
                            defaultValue="CLUB"
                        >
                            <Radio required value="BDS" label="BDS" />
                            <Radio required value="CLUB" label="Club" />
                        </RadioGroup>
                    </FormControl>

                    <Divider />

                    <Stack className="seance-form-cat">
                        <FormControl>
                            <FormLabel>Nom et Prenom</FormLabel>
                            <Input
                                onChange={handleIdentity}
                                value={identity}
                                type="text"
                                placeholder="Ex: Lorine Schild"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                onChange={handleEmail}
                                value={email}
                                type="email"
                                placeholder="Ex: mail@edu.esiee.fr"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>N° du téléphone</FormLabel>
                            <Input
                                onChange={handleTel}
                                value={tel}
                                type="tel"
                                placeholder="Ex: 07 31 55 67 69"
                            />
                        </FormControl>
                    </Stack>

                    <Divider />

                    <FormControl>
                        <FormLabel>Crénaux disponible</FormLabel>

                        <Calendar
                            localizer={localizer}
                            defaultView="week"
                            culture="fr"
                            style={{ height: "500px" }}
                            views={["month", "week"]}
                            messages={messages}
                            min={today} // Début aujourd'hui
                            max={twoMonthsFromNow} // Fin dans 2 mois
                        />
                    </FormControl>

                    <Divider />

                    <Stack className="seance-form-cat">
                        <FormLabel>Paiement</FormLabel>
                        <Typography>
                            Nous vous invitons à effectuer le paiement selon la
                            cotisation que vous avez via{" "}
                            <Link to="https://www.lydia.me/">Lydia</Link>. Votre
                            inscription ne sera validée qu&apos;après réception
                            du paiement.
                        </Typography>

                        <Typography color="danger">
                            Attention ! En cliquant sur ce bouton, le formulaire
                            sera envoyé au staff du club et une place vous sera
                            réservée. Merci de bien vérifier les informations
                            avant de soumettre.
                        </Typography>

                        <Button
                            disabled={
                                !(
                                    identity.length > 0 &&
                                    email.length > 0 &&
                                    tel.length > 0 &&
                                    cotisantOf.length > 0
                                )
                            }
                            type="submit"
                        >
                            <img src={Lydia} alt="" />
                            <Typography>
                                Valider votre inscription ici
                            </Typography>
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Layout>
    );
}
