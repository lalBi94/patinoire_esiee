import { Stack, Typography, Box } from "@mui/joy";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import "./Home.scss";
import Logo from "../../assets/images/favicon.png";

export default function Home() {
    return (
        <Layout>
            <Stack id="home-container">
                <Stack id="bg">
                    <Link to="/cotiser">
                        <img src={Logo} alt="Logo de la patinoire" />
                    </Link>
                </Stack>

                <Typography level="h3">
                    Bienvenue <br /> au{" "}
                    <span
                        style={{
                            background: "#b7deed",
                            borderRadius: "5px",
                            padding: "2px",
                        }}
                    >
                        Club de Patinoire
                    </span>{" "}
                    d&apos;ESIEE Paris !
                </Typography>

                <Stack id="home-text-corp">
                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Qui sommes-nous ?
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Dans l&apos;organisation du club, il y a 8 personnes
                            : Jean, Maxence, Lilian, Benoît, Guillaume, Marie,
                            Mathieu et Antoine. Jean et Benoît ont tous les deux
                            suivi des cours de patinage et pourront donc
                            particulièrement bien t&apos;accompagner. Jean a
                            notamment pratiqué le freestyle en compétition
                            tandis que Benoît s&apos;est concentré sur le
                            patinage de vitesse.
                        </Typography>
                    </Box>

                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Pourquoi cotiser au club de patinoire ?
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Cotiser au club, c&apos;est profiter de séances à
                            tarif réduit ! Les séances te coûteront 8.75€ au
                            lieu de 9.75€.
                        </Typography>
                    </Box>

                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Quels sont les prérequis pour participer à une
                            séance ?
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Il te faut soit récupérer la vignette sport
                            (gratuite) auprès de Stéphane Gérard, soit être
                            cotisant du club. Avant d&apos;entrer dans la
                            patinoire, nous vérifierons que tu remplis
                            l&apos;une de ces deux conditions (c’est important
                            pour que tu sois couvert médicalement).
                        </Typography>
                    </Box>

                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Equipements
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Les patins sont fournis par la patinoire, tu
                            n&apos;as donc pas à t&apos;en soucier.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Layout>
    );
}
