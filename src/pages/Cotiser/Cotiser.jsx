import Layout from "../../layout/Layout";
import {
    Stack,
    Typography,
    Box,
    FormControl,
    FormLabel,
    Button,
    Checkbox,
    Input,
    Divider,
    ModalClose,
    Modal,
    ModalDialog,
    DialogContent,
    DialogTitle,
} from "@mui/joy";
import "./Cotiser.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Lydia from "../../assets/images/lydia-logo.webp";
import axios from "axios";

export default function Cotiser() {
    const [identity, setIdentity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [classe, setClasse] = useState("");
    const [checkKnowPrac, setKnowPrac] = useState(false);
    const [checkApprouveRules, setApprouveRules] = useState(false);
    const [checkApprouveCGU, setAppouveCGU] = useState(false);
    const [onModal, setOnModal] = useState(false);
    const navigate = useNavigate();

    const handleIdentity = (e) => {
        setIdentity(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleTel = (e) => {
        setTel(e.target.value);
    };

    const handleClasse = (e) => {
        setClasse(e.target.value);
    };

    const handleCheckKnowPrac = (event) => {
        setKnowPrac(event.target.checked);
    };

    const handleCheckApprouveRules = (event) => {
        setApprouveRules(event.target.checked);
    };

    const handleCheckApprouveCGU = (event) => {
        setAppouveCGU(event.target.checked);
    };

    const handleCloseModal = () => {
        setOnModal(false);
        navigate("/home");
    };

    const handleOpenModal = () => {
        setOnModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            identity,
            email,
            tel,
            classe,
            checkApprouveCGU: checkApprouveCGU ? 1 : 0,
            checkApprouveRules: checkApprouveRules ? 1 : 0,
            checkKnowPrac: checkKnowPrac ? 1 : 0,
        });

        const formData = new FormData();
        formData.append("identite", identity);
        formData.append("email", email);
        formData.append("tel", tel);
        formData.append("promo", classe);
        formData.append(
            "questions",
            JSON.stringify({
                knowledge: checkKnowPrac ? 1 : 0,
                club_rules: checkApprouveRules ? 1 : 0,
                cgu: checkApprouveCGU ? 1 : 0,
            })
        );

        const req = await axios.post(
            "http://localhost:5002/cotisation/ask",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        if (!req.data.error) {
            handleOpenModal();
        }
    };

    return (
        <Layout>
            <Modal open={onModal}>
                <ModalDialog color="success" layout="center" size="md">
                    <ModalClose onClick={handleCloseModal} />

                    <DialogTitle>
                        <Typography startDecorator={<CheckCircleIcon />}>
                            Succes
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Typography>
                            Demande de cotisation validé, vous serez bientôt
                            contacté(e) !
                        </Typography>
                    </DialogContent>
                </ModalDialog>
            </Modal>

            <Stack id="cotiser-container">
                <Box id="cotiser-title">
                    <Typography level="h3">Formulaire de Cotisation</Typography>

                    <Link to="/tarifs" className="cotisation-aventage">
                        <Typography startDecorator={<CheckCircleIcon />}>
                            Avantage de cotiser dans le club
                        </Typography>
                    </Link>
                </Box>

                <form onSubmit={handleSubmit} id="cotiser-form">
                    <Stack className="cotiser-form-cat">
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
                            <FormLabel type="tel">N° du téléphone</FormLabel>
                            <Input
                                value={tel}
                                onChange={handleTel}
                                type="tel"
                                placeholder="Ex: 07 31 55 67 69"
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Classe</FormLabel>
                            <Input
                                value={classe}
                                onChange={handleClasse}
                                type="text"
                                placeholder="Ex: E3(T/S/E)"
                            />
                        </FormControl>
                    </Stack>

                    <FormControl className="cotiser-form-cat">
                        <FormLabel>Questions (cocher si oui)</FormLabel>

                        <Checkbox
                            checked={checkKnowPrac}
                            onChange={handleCheckKnowPrac}
                            label="Savez-vous patiner ?"
                        />

                        <Checkbox
                            checked={checkApprouveRules}
                            onChange={handleCheckApprouveRules}
                            label="Avez-vous pris connaissance des règles du club et les acceptez-vous ?"
                        />

                        <Checkbox
                            checked={checkApprouveCGU}
                            onChange={handleCheckApprouveCGU}
                            label="Avez-vous pris connaissance des CGU du site et les acceptez-vous ?"
                        />
                    </FormControl>

                    <Divider />

                    <Stack className="cotiser-form-cat">
                        <FormLabel>Paiement</FormLabel>
                        <Typography>
                            Veuillez régler les droits d&apos;adhésion{" "}
                            <b>
                                <i>(10€)</i>
                            </b>{" "}
                            via le bouton ci-dessous, qui vous redirigera vers{" "}
                            <Link to="https://www.lydia.me/">Lydia</Link>. Vous
                            serez ensuite rapidement contacté via les
                            informations fournies pour finaliser votre adhésion.
                        </Typography>

                        <Typography color="danger">
                            Attention ! En cliquant sur ce bouton, le formulaire
                            sera transmis au staff du club. Veuillez vérifier
                            attentivement les informations avant de soumettre.
                        </Typography>

                        <Button
                            type="submit"
                            disabled={
                                !(
                                    identity.length > 0 &&
                                    email.length > 0 &&
                                    tel.length > 0 &&
                                    classe.length > 0 &&
                                    checkApprouveCGU &&
                                    checkApprouveRules
                                )
                            }
                        >
                            <img src={Lydia} alt="" />
                            <Typography>Valider votre adhésion ici</Typography>
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Layout>
    );
}
