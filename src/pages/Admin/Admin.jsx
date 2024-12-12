import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./Admin.scss";
import { fr } from "date-fns/locale";
import {
    Stack,
    Divider,
    Input,
    Button,
    FormControl,
    FormLabel,
    Typography,
    ModalClose,
    Modal,
    ModalDialog,
    DialogContent,
    DialogTitle,
} from "@mui/joy";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import {
    deleteSceance,
    deleteSomeone,
    submitRegCotisant,
    getCotisant,
    getAskCotisant,
    addSceance,
    getSceance,
    refuseSomeone,
    acceptSomeone,
} from "../../services/admin.js";

export default function Admin() {
    const navigate = useNavigate();
    const [sceances, setSceances] = useState([]);
    const [date, setDate] = useState(null);
    const [places, setPlaces] = useState(10);
    const [currentAskCotisant, setCurrentAskCotisant] = useState(null);
    const [askCotisant, setAskCotisation] = useState([]);
    const [currentFocus, setCurrentFocus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalAskCotisant, setShowModalAskCotisant] = useState(false);
    const [cotisants, setCotisant] = useState([]);
    const [regCotisantIdentite, setRegCotisantIdentite] = useState("");
    const [regCotisantPromo, setRegCotisantPromo] = useState("");
    const [regCotisantEmail, setRegCotisantEmail] = useState("");
    const [regCotisantTel, setRegCotisantTel] = useState("");

    const handleDeleteSeance = async (id_sceance) => {
        const res = await deleteSceance(id_sceance);

        if (!res.error) {
            window.location.reload();
        }
    };

    const handleDeleteSomeone = async (id_bro, id_sceance) => {
        const res = await deleteSomeone(id_bro, id_sceance);

        if (!res.error) {
            window.location.reload();
        }
    };

    const handleSubmitRegCotisant = async (e) => {
        e.preventDefault();

        const res = submitRegCotisant(
            regCotisantIdentite,
            regCotisantPromo,
            regCotisantEmail,
            regCotisantTel
        );

        if (!res.error) {
            window.location.reload();
        }
    };

    const handleRegCotisantIdentite = (e) => {
        setRegCotisantIdentite(e.target.value);
    };

    const handleRegCotisantPromo = (e) => {
        setRegCotisantPromo(e.target.value);
    };

    const handleRegCotisantEmail = (e) => {
        setRegCotisantEmail(e.target.value);
    };

    const handleRegCotisantTel = (e) => {
        setRegCotisantTel(e.target.value);
    };

    const handleGetCotisant = async () => {
        const res = await getCotisant();
        setCotisant(res.data);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handlePlaces = (e) => {
        setPlaces(e.target.value);
    };

    const handleGetAskCotisation = async () => {
        const res = await getAskCotisant();
        setAskCotisation(res.data);
    };

    const handleAddSceance = async (e) => {
        e.preventDefault();

        const res = await addSceance(date, places);

        if (!res.error) {
            setSceances([
                ...sceances,
                { date, places, id: "NEW", participants: [] },
            ]);
        }
    };

    const refreshSceances = async () => {
        await getSceance().then((res) => {
            setSceances(res);
        });
    };

    const handleClickParticipant = (data) => {
        setCurrentFocus(data);
        setShowModal(true);
    };

    const handleClickCotisant = (data) => {
        setCurrentAskCotisant(data);
        setShowModalAskCotisant(true);
    };

    const handleCloseModal = () => {
        setCurrentFocus(null);
        setShowModal(false);
    };

    const handleCloseModalAskCotisant = () => {
        setShowModalAskCotisant(false);
        setCurrentAskCotisant(null);
    };

    const handleRefuseSomeone = async () => {
        const req = await refuseSomeone(currentAskCotisant.id);

        if (!req.error) {
            window.location.reload();
        }
    };

    const handleAcceptSomeone = async () => {
        const res = acceptSomeone(
            currentAskCotisant.id,
            currentAskCotisant.identite,
            currentAskCotisant.email,
            currentAskCotisant.tel,
            currentAskCotisant.promo,
            currentAskCotisant.cgu,
            currentAskCotisant.knowledge,
            currentAskCotisant.club_rules
        );

        if (!res.error) {
            window.location.reload();
        }
    };

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration dans `days` jours
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    };

    const getCookie = (name) => {
        const nameEQ = `${name}=`;
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].startsWith(nameEQ)) {
                return cookies[i].substring(nameEQ.length);
            }
        }
        return null;
    };

    useEffect(() => {
        if (
            getCookie(import.meta.env.VITE_A_NAME) !==
            import.meta.env.VITE_PASSW_A
        ) {
            let first = prompt("Premiere verification...");
            let second = prompt("Deuxieme verification...");

            if (
                first !== import.meta.env.VITE_A_NAME &&
                second !== import.meta.env.VITE_PASSW_A
            ) {
                navigate("/");
            } else {
                setCookie(
                    import.meta.env.VITE_A_NAME,
                    import.meta.env.VITE_PASSW_A,
                    1
                );
            }
        }

        refreshSceances();
        handleGetCotisant();
        handleGetAskCotisation();
    }, []);

    return (
        <Layout>
            <Modal open={showModal}>
                {currentFocus ? (
                    <ModalDialog color="primary" layout="center" size="md">
                        <ModalClose onClick={handleCloseModal} />

                        <DialogTitle>
                            <Typography startDecorator={<InfoIcon />}>
                                <b>
                                    <i>
                                        <u>{currentFocus.identite}</u>
                                    </i>
                                </b>
                            </Typography>
                        </DialogTitle>

                        <DialogContent>
                            <Typography level="p">
                                <b>Email :</b> {currentFocus.email}
                            </Typography>

                            <Typography level="p">
                                <b>Tel :</b> {currentFocus.numero_tel}
                            </Typography>
                        </DialogContent>
                    </ModalDialog>
                ) : null}
            </Modal>

            <Modal open={showModalAskCotisant}>
                {currentAskCotisant ? (
                    <ModalDialog color="primary" layout="center" size="md">
                        <ModalClose onClick={handleCloseModalAskCotisant} />

                        <DialogTitle>
                            <Typography startDecorator={<EmailIcon />}>
                                <b>
                                    <i>
                                        <u>{currentAskCotisant.identite}</u>
                                    </i>
                                </b>
                            </Typography>
                        </DialogTitle>

                        <DialogContent style={{ display: "flex", gap: "10px" }}>
                            <Stack>
                                <Typography level="p">
                                    <b>Email :</b> {currentAskCotisant.email}
                                </Typography>

                                <Typography level="p">
                                    <b>Tel :</b> {currentAskCotisant.tel}
                                </Typography>

                                <Typography level="p">
                                    <b>Promo :</b> {currentAskCotisant.promo}
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography level="p">
                                    <b>Sait patiner ?</b>{" "}
                                    {currentAskCotisant.knowledge === 1 ? (
                                        <CheckIcon style={{ color: "green" }} />
                                    ) : (
                                        <CancelIcon style={{ color: "red" }} />
                                    )}
                                </Typography>

                                <Typography level="p">
                                    <b>A lu les regles du club ? </b>{" "}
                                    {currentAskCotisant.club_rules === 1 ? (
                                        <CheckIcon style={{ color: "green" }} />
                                    ) : (
                                        <CancelIcon style={{ color: "red" }} />
                                    )}
                                </Typography>

                                <Typography level="p">
                                    <b>A lu les CGU ? </b>{" "}
                                    {currentAskCotisant.cgu === 1 ? (
                                        <CheckIcon style={{ color: "green" }} />
                                    ) : (
                                        <CancelIcon style={{ color: "red" }} />
                                    )}
                                </Typography>
                            </Stack>

                            <Stack style={{ display: "flex", gap: "5px" }}>
                                <Button
                                    color="success"
                                    onClick={handleAcceptSomeone}
                                >
                                    Confirmer
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={handleRefuseSomeone}
                                >
                                    Refuser
                                </Button>
                            </Stack>
                        </DialogContent>
                    </ModalDialog>
                ) : null}
            </Modal>

            <Stack id="admin-lang">
                <Typography textAlign="center" level="h1" id="admin-title">
                    Zone Administrateur
                </Typography>

                <Typography textAlign="right" level="h3">
                    Actions
                </Typography>

                <Stack id="sections-container">
                    <Stack className="section">
                        <h3>Ajouter une sceance</h3>

                        <form
                            onSubmit={handleAddSceance}
                            className="section-in-section"
                        >
                            <Stack className="section-ipt-group">
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        type="datetime-local"
                                        onChange={handleDate}
                                        required
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Nombre de place</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        placeholder="ex: 10"
                                        defaultValue={10}
                                        onChange={handlePlaces}
                                        type="number"
                                        value={places}
                                        required
                                    />
                                </FormControl>
                            </Stack>

                            <Button
                                type="submit"
                                className="section-in-section-btn"
                            >
                                Valider
                            </Button>
                        </form>
                    </Stack>

                    <Stack className="section">
                        <h3>Ajouter un(e) cotisant(e)</h3>

                        <form
                            onSubmit={handleSubmitRegCotisant}
                            className="section-in-section"
                        >
                            <Stack className="section-ipt-group">
                                <FormControl>
                                    <FormLabel>Nom & Prenom</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        type="texte"
                                        placeholder="Ex: Jean Paul"
                                        onChange={handleRegCotisantIdentite}
                                        value={regCotisantIdentite}
                                        required
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        placeholder="ex: abc@def.gh"
                                        onChange={handleRegCotisantEmail}
                                        type="email"
                                        value={regCotisantEmail}
                                        required
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Numéro de télephone</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        placeholder="ex: 0670504937"
                                        onChange={handleRegCotisantTel}
                                        type="tel"
                                        value={regCotisantTel}
                                        required
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Promo</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        placeholder="ex: E3T"
                                        onChange={handleRegCotisantPromo}
                                        type="text"
                                        value={regCotisantPromo}
                                        required
                                    />
                                </FormControl>
                            </Stack>

                            <Button
                                type="submit"
                                className="section-in-section-btn"
                            >
                                Créer
                            </Button>
                        </form>
                    </Stack>

                    <Stack id="not-work" className="section">
                        <h3>Modifier les tarifs</h3>

                        <form onSubmit={null} className="section-in-section">
                            <Stack className="section-ipt-group">
                                <FormControl>
                                    <FormLabel>Cotisant du club</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        type="text"
                                        onChange={null}
                                        placeholder="Actuel: 8.75€"
                                        required
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Non-Cotisant</FormLabel>
                                    <Input
                                        className="section-in-section-ipt"
                                        type="text"
                                        onChange={null}
                                        placeholder="Actuel: 9.75€"
                                        required
                                    />
                                </FormControl>
                            </Stack>

                            <Button
                                type="submit"
                                className="section-in-section-btn"
                            >
                                Valider
                            </Button>
                        </form>
                    </Stack>

                    <Stack id="not-work" className="section">
                        <h3>Recuperer la liste des cotisants</h3>

                        <Button
                            type="submit"
                            className="section-in-section-btn"
                        >
                            Telecharger
                        </Button>
                    </Stack>
                </Stack>

                <Typography textAlign="right" level="h3">
                    Seances
                </Typography>

                <Stack id="list-sceance">
                    {sceances.length > 0
                        ? sceances.map((v, k) => (
                              <Stack key={k} className="list-sceance-box">
                                  <CancelIcon
                                      onClick={() => {
                                          handleDeleteSeance(v.id);
                                      }}
                                      className="list-seance-box-close"
                                  />

                                  <Stack className="list-sceance-box-id">
                                      #{v.id}
                                  </Stack>
                                  <Stack className="list-sceance-box-date">
                                      <b>
                                          <u>
                                              <nobr>
                                                  {format(
                                                      v.date,
                                                      "EEEE dd MMMM yyyy",
                                                      {
                                                          locale: fr,
                                                      }
                                                  )}
                                              </nobr>
                                          </u>
                                      </b>
                                  </Stack>

                                  <Divider />

                                  <Stack className="list-sceance-box-places">
                                      Places restantes : {v.places} /
                                      {v.places + v.participants.length}
                                  </Stack>

                                  <Divider />

                                  <ul className="list-sceance-box-participants">
                                      {v.participants.map((par, k) => (
                                          <li
                                              key={k}
                                              className="list-sceance-box-participant"
                                          >
                                              <Typography
                                                  className="list-sceance-box-participant-text"
                                                  level="p"
                                                  endDecorator={
                                                      <Stack className="list-sceance-box-participant-actions">
                                                          <Button
                                                              onClick={() => {
                                                                  handleDeleteSomeone(
                                                                      par.id,
                                                                      v.id
                                                                  );
                                                              }}
                                                              className="list-sceance-box-participant-btn cancel"
                                                          >
                                                              <CancelIcon fontSize="small" />
                                                          </Button>

                                                          <Button
                                                              className="list-sceance-box-participant-btn see"
                                                              onClick={() => {
                                                                  handleClickParticipant(
                                                                      par
                                                                  );
                                                              }}
                                                          >
                                                              <VisibilityIcon fontSize="small" />
                                                          </Button>
                                                      </Stack>
                                                  }
                                              >
                                                  {par.identite}
                                              </Typography>
                                          </li>
                                      ))}
                                  </ul>
                              </Stack>
                          ))
                        : null}
                </Stack>

                <Typography textAlign="right" level="h3">
                    Demandes cotisations
                </Typography>

                <Stack id="list-ask-cotisation">
                    {askCotisant.length > 0
                        ? askCotisant.map((v, k) => (
                              <Stack
                                  key={k}
                                  onClick={() => {
                                      handleClickCotisant(v);
                                  }}
                                  className="list-ask-cotisation-box"
                              >
                                  <Typography
                                      className="list-ask-cotisation-box-name"
                                      textTransform="uppercase"
                                      startDecorator={
                                          <EmailIcon fontSize="medium" />
                                      }
                                  >
                                      {v.identite}
                                  </Typography>
                              </Stack>
                          ))
                        : null}
                </Stack>

                <Typography textAlign="right" level="h3">
                    Cotisants
                </Typography>

                <Stack id="list-cotisants">
                    {cotisants
                        ? cotisants.map((v, k) => (
                              <Stack key={k} className="list-cotisant-box">
                                  <Typography
                                      level="p"
                                      className="list-cotisant-box-name"
                                  >
                                      <u>
                                          <b>{v.identite}</b>
                                      </u>
                                  </Typography>

                                  <img
                                      className="list-cotisant-box-img"
                                      src="https://picsum.photos/200"
                                  />

                                  <Stack>
                                      <Typography level="p">
                                          <b>Tel :</b> {v.tel}
                                      </Typography>

                                      <Typography level="p">
                                          <b>Email :</b> {v.email}
                                      </Typography>

                                      <Typography level="p">
                                          <b>Promo :</b> {v.promo}
                                      </Typography>
                                  </Stack>

                                  <Stack>
                                      <Typography level="p">
                                          <b>Sait patiner ?</b>{" "}
                                          {v.knowledge === 1 ? (
                                              <CheckIcon
                                                  style={{ color: "green" }}
                                              />
                                          ) : (
                                              <CancelIcon
                                                  style={{ color: "red" }}
                                              />
                                          )}
                                      </Typography>

                                      <Typography level="p">
                                          <b>A lu les regles du club ? </b>{" "}
                                          {v.club_rules === 1 ? (
                                              <CheckIcon
                                                  style={{ color: "green" }}
                                              />
                                          ) : (
                                              <CancelIcon
                                                  style={{ color: "red" }}
                                              />
                                          )}
                                      </Typography>

                                      <Typography level="p">
                                          <b>A lu les CGU ? </b>{" "}
                                          {v.cgu === 1 ? (
                                              <CheckIcon
                                                  style={{ color: "green" }}
                                              />
                                          ) : (
                                              <CancelIcon
                                                  style={{ color: "red" }}
                                              />
                                          )}
                                      </Typography>
                                  </Stack>
                              </Stack>
                          ))
                        : null}
                </Stack>
            </Stack>
        </Layout>
    );
}
