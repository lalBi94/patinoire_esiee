import {
    Stack,
    Box,
    Typography,
    Divider,
    Drawer,
    ModalClose,
    DialogTitle,
} from "@mui/joy";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import Logo from "../../assets/images/favicon.png";

export default function Navbar() {
    const [inBurger, setInBurger] = useState(false);

    const handleBurgerMenu = () => {
        setInBurger(!inBurger);
    };

    return (
        <Stack id="nav-container">
            <Drawer
                onClose={handleBurgerMenu}
                anchor="right"
                size="sm"
                variant="plain"
                open={inBurger}
            >
                <DialogTitle>Navigation</DialogTitle>
                <ModalClose />

                <Stack id="burger">
                    <Box className="nav-links-content">
                        <Link to="/accueil" className="nav-links">
                            <HomeIcon className="nav-links-icons" />

                            <Typography className="nav-links-text">
                                Accueil
                            </Typography>
                        </Link>
                    </Box>

                    <Divider />

                    <Box className="nav-links-content">
                        <Link className="nav-links" to="/cotiser">
                            <PersonIcon className="nav-links-icons" />

                            <Typography className="nav-links-text">
                                Cotiser pour le club
                            </Typography>
                        </Link>
                    </Box>

                    <Divider />

                    <Box className="nav-links-content">
                        <Link className="nav-links" to="/seance">
                            <DriveFileRenameOutlineRoundedIcon className="nav-links-icons" />
                            <Typography className="nav-links-text">
                                S&apos;inscrire a une séance
                            </Typography>
                        </Link>
                    </Box>

                    <Divider />

                    <Box className="nav-links-content">
                        <Link
                            target="_blank"
                            to="https://www.instagram.com/club_patinoire_esiee/?igsh=emxwOXJ0MDNqdTlz#"
                            className="nav-links"
                        >
                            <InstagramIcon className="nav-links-icons" />

                            <Typography
                                fontSize="small"
                                className="nav-links-text"
                            >
                                Instagram
                            </Typography>
                        </Link>
                    </Box>
                </Stack>
            </Drawer>

            <Box id="nav-img-container">
                <Link to="/accueil">
                    <img src={Logo} alt="" />
                </Link>
                <MenuOpenIcon
                    onClick={handleBurgerMenu}
                    className="show-burger"
                />
            </Box>

            <Stack id="nav-links-container">
                <Box className="nav-links-content">
                    <Link to="/accueil" className="nav-links">
                        <HomeIcon className="nav-links-icons" />

                        <Typography className="nav-links-text">
                            Accueil
                        </Typography>
                    </Link>
                </Box>
                <Divider orientation="vertical" />
                <Box className="nav-links-content">
                    <Link className="nav-links" to="/cotiser">
                        <PersonIcon className="nav-links-icons" />

                        <Typography className="nav-links-text">
                            Cotiser pour le club
                        </Typography>
                    </Link>
                </Box>
                <Divider orientation="vertical" />
                <Box className="nav-links-content">
                    <Link className="nav-links" to="/seance">
                        <DriveFileRenameOutlineRoundedIcon className="nav-links-icons" />
                        <Typography className="nav-links-text">
                            S&apos;inscrire a une séance
                        </Typography>
                    </Link>
                </Box>
                <Divider orientation="vertical" />
                <Box className="nav-links-content">
                    <Link
                        target="_blank"
                        to="https://www.instagram.com/club_patinoire_esiee/?igsh=emxwOXJ0MDNqdTlz#"
                        className="nav-links"
                    >
                        <InstagramIcon className="nav-links-icons" />

                        <Typography fontSize="small" className="nav-links-text">
                            Instagram
                        </Typography>
                    </Link>
                </Box>
            </Stack>
        </Stack>
    );
}
