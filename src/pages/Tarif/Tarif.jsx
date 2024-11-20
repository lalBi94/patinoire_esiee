import Layout from "../../layout/Layout";
import { Stack, Typography, Box, Divider } from "@mui/joy";
import "./Tarif.scss";
import JoinClub from "/joinus.gif";

export default function Tarif() {
    return (
        <Layout>
            <Stack id="tarif-container">
                <Typography level="h3">Tarification par séance</Typography>

                <Stack id="tarif-tab">
                    <Box className="tarif-row">
                        <Typography>
                            <b>Non-Cotisant</b>
                        </Typography>
                        <Typography>9.75€</Typography>
                    </Box>
                    <Divider />
                    <Box className="tarif-row">
                        <Typography>
                            <b>Cotisant du club</b>
                        </Typography>
                        <Typography>8.75€</Typography>
                    </Box>
                </Stack>

                <img src={JoinClub} alt="cool" />
            </Stack>
        </Layout>
    );
}
