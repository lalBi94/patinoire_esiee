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
                    <Link to="cotiser">
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
                            Diam adipiscing accusam option laoreet sea dolore
                            sed takimata minim vel stet blandit labore illum.
                            Takimata et eos dolor aliquip labore consetetur eos
                            dolore duo ut stet. Consetetur eu eu nostrud dolor
                            in in et. Dolores nonumy duo consetetur laoreet ut
                            elitr ipsum consetetur et. Kasd vel vel lorem
                            takimata eu accumsan. Et ipsum et kasd et amet et
                            ipsum dolore consectetuer nisl iriure. Facer duis
                            takimata. Labore amet dolore dignissim magna vel
                            vero id dolore magna. Ea accumsan eirmod vel stet
                            diam illum dignissim amet.
                        </Typography>
                    </Box>

                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Comment nous rejoindre ?
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Labore molestie feugait. Et invidunt ea gubergren
                            dolore dolore magna lobortis aliquyam vero eos velit
                            sed ea gubergren at commodo erat. Wisi diam magna
                            aliquyam duis doming stet ea tempor euismod sit et
                            aliquip. Minim stet dolore invidunt in invidunt
                            dolores sed ut et rebum ipsum nibh velit luptatum.
                            Amet exerci lorem diam voluptua volutpat justo
                            nonumy ad labore assum dolores sadipscing. Dolores
                            sed invidunt suscipit commodo dolor.
                        </Typography>
                    </Box>

                    <Box className="home-text-inside">
                        <Typography
                            className="home-text-inside-title"
                            level="h4"
                        >
                            Je suis cotisant
                        </Typography>

                        <Typography className="home-text-inside-text">
                            Kasd magna dolore. Eos at et consectetuer justo
                            dolore duo odio in liber sanctus sea. Elitr
                            consetetur vulputate eirmod lorem vel amet magna
                            lorem odio vero nonummy accusam sed diam molestie.
                            Consequat ea ea zzril. Dolor iriure magna ea stet
                            ad. Et facilisis nihil at rebum nisl te sea.
                            Takimata lorem diam duis duo in elitr. Ipsum lorem
                            dolor amet et no stet autem iriure aliquyam ut ipsum
                            vero iusto et duo consetetur lobortis elitr. Liber
                            hendrerit esse dolores facilisis at facer doming
                            eirmod et facilisis.
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
                            Labore ut sanctus sea sed eum delenit tincidunt.
                            Accusam diam lorem magna sed ipsum aliquyam dolor
                            sit eos eum et clita vel. Justo vel labore nonummy
                            sed facilisis duis et diam. Sea rebum stet clita
                            nonumy ut sit no dolores ut est eos voluptua lorem
                            sed feugiat. Nonumy iriure eirmod et nonumy stet et
                            eirmod kasd augue et ex dolor vero eos vero.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Layout>
    );
}
