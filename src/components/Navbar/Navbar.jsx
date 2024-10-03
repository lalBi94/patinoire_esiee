import { Stack, Box, Typography, Divider } from "@mui/joy";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import HomeIcon from "@mui/icons-material/Home";

export default function Navbar() {
    return (
        <Stack id="nav-container">
            <Box id="nav-img-container">
                <img src="/favicon.png" alt="" />
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
                    <Link className="nav-links" to="/inscription">
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
                        to="https://instagram.com"
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
