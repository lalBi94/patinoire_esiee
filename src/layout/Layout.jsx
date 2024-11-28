import { Stack } from "@mui/joy";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import Footer from "../components/Footer/Footer";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
    return (
        <Stack id="layout-container">
            <Navbar />

            <main>{children}</main>

            <Footer></Footer>
        </Stack>
    );
}
