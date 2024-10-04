import { Stack, Typography, Tooltip, Divider } from "@mui/joy";
import "./Footer.scss";
import { Link } from "react-router-dom";
import Avatar from "@mui/joy/Avatar";

export default function Footer() {
    return (
        <Stack id="footer-container">
            <Stack className="footer-cat">
                <Typography className="footer-info-title">
                    <u>Contacts</u>
                </Typography>

                <Stack className="footer-data">
                    <Link className="footer-data-content">
                        <Avatar />
                        <Typography>
                            president@patinoir-esiee.fr (President)
                        </Typography>
                    </Link>

                    <Link className="footer-data-content">
                        <Avatar />
                        <Typography>
                            admin@patinoir-esiee.fr (Administrateur)
                        </Typography>
                    </Link>

                    <Link className="footer-data-content">
                        <Avatar />
                        <Typography>
                            bilal.boudjemline@edu.esiee.fr (Web Master)
                        </Typography>
                    </Link>
                </Stack>
            </Stack>

            <Divider className="hide-on-resp" orientation="vertical" />

            <Stack className="footer-cat">
                <Typography className="footer-info-title">
                    <u>Mentions legales</u>
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

            {/* <Divider className="hide-on-resp" orientation="vertical" />

            <Stack className="footer-cat">
                <Typography className="footer-info-title">
                    <u>Liens externes</u>
                </Typography>

                <Stack className="footer-data-row">
                    <Tooltip title="Bureau des sports d'ESIEE Paris">
                        <Link className="footer-data-content">
                            <img src="/bds.png" alt="" />
                        </Link>
                    </Tooltip>

                    <Tooltip title="ESIEE Paris">
                        <Link className="footer-data-content">
                            <img src="/esiee.jpg" alt="" />
                        </Link>
                    </Tooltip>
                </Stack>
            </Stack> */}
        </Stack>
    );
}
