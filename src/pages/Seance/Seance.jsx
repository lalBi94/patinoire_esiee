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
    ModalClose,
    Modal,
    ModalDialog,
    DialogContent,
    DialogTitle,
} from "@mui/joy";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import Lydia from "../../assets/images/lydia-logo.webp";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getSeance, sendReservation } from "../../services/seance";

const locales = {
    fr: fr,
};

const messages = {
    today: "Actuel", // ou 'Maintenant'
    previous: "Préc.", // ou 'Avant'
    next: "Suiv.", // ou 'Après'
    month: "Mois",
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

export default function Seance() {
    const [identity, setIdentity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [cotisantOf, setCotisantOf] = useState("CLUB");
    const [seances, setSeances] = useState([]);
    const [idChoosen, setIdChoosen] = useState(null);
    const [reservationOk, setReservationOk] = useState(false);
    const [dateChooseTimestamp, setDateChooseTimestamp] = useState(null);
    const [dateChoose, setDateChoose] = useState("");
    const [reservationNonOk, setReservationNonOk] = useState(false);
    const [inLoadingReservation, setInLoadingReservation] = useState(false);

    const saveDate = (date) => {
        setDateChooseTimestamp(date);
        setDateChoose(format(date, "EEEE dd MMMM yyyy", { locale: fr }));
    };

    const handleGetSeance = async () => {
        const res = await getSeance();

        const data = res.data.map((e, k) => ({
            title: (
                <Stack key={k} className="seance-card">
                    <Typography>
                        <b>Places: {e.places}</b>
                    </Typography>

                    <Button
                        onClick={() => {
                            setIdChoosen(e.id);
                            saveDate(e.date);
                        }}
                    >
                        Choisir
                    </Button>
                </Stack>
            ),
            start: new Date(e.date),
            end: new Date(e.date),
            allDay: true,
        }));

        return data;
    };

    useEffect(() => {
        handleGetSeance().then((res) => {
            setSeances(res);
        });
    }, []);

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

    const handleReservationOk = () => {
        setReservationOk(!reservationOk);
    };

    const handleReservationNonOk = () => {
        setReservationNonOk(!reservationNonOk);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInLoadingReservation(true);

        const res = await sendReservation(
            identity,
            cotisantOf,
            email,
            tel,
            idChoosen
        );

        setInLoadingReservation(false);

        if (!res || res.error) {
            handleReservationNonOk();
        } else {
            handleReservationOk();
        }
    };

    const handleOnCloseModal = () => {
        handleReservationOk();
        window.location.reload();
    };

    const handleOnCloseModalNonOk = () => {
        handleReservationNonOk();
    };

    return (
        <Layout>
            <Modal open={reservationOk}>
                <ModalDialog color="success" layout="center" size="md">
                    <ModalClose onClick={handleOnCloseModal} />

                    <DialogTitle>
                        <Typography startDecorator={<CheckCircleIcon />}>
                            Succes
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Typography>
                            Séance réservée, vous serez bientôt contacté(e) !
                        </Typography>
                    </DialogContent>
                </ModalDialog>
            </Modal>

            <Modal open={reservationNonOk}>
                <ModalDialog color="error" layout="center" size="md">
                    <ModalClose onClick={handleOnCloseModalNonOk} />

                    <DialogTitle>
                        <Typography startDecorator={<ErrorIcon />}>
                            Erreur
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Typography>
                            Vous ne pouvez pas reserver cette sceance ! Mille
                            excuses...
                        </Typography>
                    </DialogContent>
                </ModalDialog>
            </Modal>

            <Stack id="seance-container">
                <Box>
                    <Typography level="h3">
                        S&apos;inscrire a une séance
                    </Typography>
                </Box>

                <form id="seance-form" onSubmit={handleSubmit}>
                    <FormControl required className="seance-form-cat">
                        <FormLabel>Cotisant</FormLabel>

                        <RadioGroup
                            onChange={handleCotisantOf}
                            name="cotisant"
                            defaultValue="AUCUNE"
                        >
                            <Radio required value="CLUB" label="Club (8,75€)" />
                            <Radio required value="BDS" label="BDS (9,75€)" />
                            <Radio
                                required
                                value="AUCUNE"
                                label="Aucune (9,75€)"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Divider />

                    <Stack className="seance-form-cat">
                        <FormControl required>
                            <FormLabel>Nom et Prenom</FormLabel>
                            <Input
                                onChange={handleIdentity}
                                value={identity}
                                type="text"
                                placeholder="Ex: Lorine Schild"
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                onChange={handleEmail}
                                value={email}
                                type="email"
                                placeholder="Ex: mail@edu.esiee.fr"
                            />
                        </FormControl>

                        <FormControl required>
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

                    <FormControl required>
                        <FormLabel>Crénaux disponible</FormLabel>

                        <Calendar
                            localizer={localizer}
                            defaultView="month"
                            culture="fr"
                            style={{ height: "500px" }}
                            views={["month"]}
                            messages={messages}
                            events={seances}
                        />

                        <Typography level="h3">
                            <b>
                                <u>
                                    Réservé pour le{" "}
                                    {dateChoose.length > 0 ? (
                                        dateChoose
                                    ) : (
                                        <span style={{ color: "red" }}>?</span>
                                    )}
                                </u>
                            </b>
                        </Typography>
                    </FormControl>

                    <Divider />

                    <Stack className="seance-form-cat">
                        <FormLabel>Paiement</FormLabel>
                        <Typography>
                            Nous vous invitons à effectuer le paiement via{" "}
                            <Link to="https://www.lydia.me/">Lydia</Link> selon
                            votre statut de cotisant. Si vous êtes cotisant, le
                            montant est de <b>8,75€</b>, sinon il s&apos;élève à{" "}
                            <b>9,75€</b>. Votre inscription ne sera validée
                            qu&apos;après réception du paiement.
                        </Typography>

                        <Typography color="danger">
                            Attention ! En cliquant sur ce bouton, le formulaire
                            sera envoyé au staff du club et une place vous sera
                            réservée. Merci de bien vérifier les informations
                            avant de soumettre.
                        </Typography>

                        <Button
                            loading={inLoadingReservation}
                            disabled={
                                !(
                                    identity.length > 0 &&
                                    email.length > 0 &&
                                    tel.length > 0 &&
                                    cotisantOf.length > 0 &&
                                    dateChoose.length > 0 &&
                                    dateChooseTimestamp
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
