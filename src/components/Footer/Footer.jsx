import { Stack, Typography, Chip, Divider } from "@mui/joy";
import "./Footer.scss";
import { Link } from "react-router-dom";
import EsieeLogo from "../../assets/images/esiee-paris.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Footer() {
    return (
        <Stack id="footer-container">
            <Stack className="footer-cat">
                <Typography className="footer-info-title">
                    <u>Contacts</u>
                </Typography>

                <Stack className="footer-data">
                    <Link className="footer-data-content">
                        <Typography
                            startDecorator={
                                <AccountCircleIcon fontSize="medium" />
                            }
                            endDecorator={
                                <Chip size="sm" variant="solid">
                                    Support
                                </Chip>
                            }
                        >
                            club.patinoire@edu.esiee.fr
                        </Typography>
                    </Link>

                    <Link className="footer-data-content">
                        <Typography
                            startDecorator={
                                <AccountCircleIcon fontSize="medium" />
                            }
                            endDecorator={
                                <Chip size="sm" variant="solid">
                                    Web Master
                                </Chip>
                            }
                        >
                            bilal.boudjemline@edu.esiee.fr
                        </Typography>
                    </Link>
                </Stack>
            </Stack>

            <Divider className="hide-on-resp" orientation="vertical" />

            <Stack>
                <Typography className="footer-info-title">
                    <u>
                        <b>Mentions legales</b>
                    </u>
                </Typography>

                <Stack className="footer-data">
                    <Link className="footer-data-content">
                        <Typography>C.G.U</Typography>
                    </Link>

                    <Link className="footer-data-content">
                        <Typography>Politique de Cookies</Typography>
                    </Link>

                    <Link className="footer-data-content">
                        <Typography>Regles du club</Typography>
                    </Link>
                </Stack>
            </Stack>

            <Divider className="hide-on-resp" orientation="vertical" />

            <Stack className="footer-cat">
                <a href="https://www.esiee.fr/" target="_blank">
                    <img src={EsieeLogo} alt="Logo ESIEE" />
                </a>
            </Stack>
        </Stack>
    );
}
