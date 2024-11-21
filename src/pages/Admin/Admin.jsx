import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
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
    Avatar,
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
import CheckIcon from "@mui/icons-material/Check";

export default function Admin() {
    const [sceances, setSceances] = useState([]);
    const [date, setDate] = useState(null);
    const [places, setPlaces] = useState(10);
    const [currentAskCotisant, setCurrentAskCotisant] = useState(null);
    const [askCotisant, setAskCotisation] = useState([]);
    const [currentFocus, setCurrentFocus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalAskCotisant, setShowModalAskCotisant] = useState(false);
    const [cotisants, setCotisant] = useState([]);

    const getCotisant = async () => {
        const req = await axios.get(
            "http://88.209.83.32:5002/cotisation/retreiveCotisant/"
        );

        setCotisant(req.data.data);
        console.log(req.data.data);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handlePlaces = (e) => {
        setPlaces(e.target.value);
    };

    const handleGetAskCotisation = async () => {
        const req = await axios.get("http://88.209.83.32:5002/cotisation/");
        setAskCotisation(req.data.data);
    };

    const handleAddSceance = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("date", date);
        formData.append("places", places);

        const req = await axios.post(
            "http://88.209.83.32:5002/calendar/addSceance",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        if (!req.data.error) {
            setSceances([
                ...sceances,
                { date, places, id: "NEW", participants: [] },
            ]);
        }

        console.log(places, new Date(date));
        console.log(req.data);
    };

    const getSceanceDebug = async () => {
        const req = await axios.get("http://88.209.83.32:5002/calendar");

        for (let e in req.data.data) {
            const formData = new FormData();
            formData.append("id", req.data.data[e].id);

            const data = await axios.post(
                "http://88.209.83.32:5002/participant/participantBySeance",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: formData,
                }
            );
            console.log(data.data.data);
            req.data.data[e] = {
                ...req.data.data[e],
                participants: data.data.data,
            };
        }

        return req.data.data;
    };

    const refreshSceances = () => {
        getSceanceDebug().then((res) => {
            console.log(res);
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
        // TODO: BUG
        //requete refuse
        //handleCloseModalAskCotisant();
        const formData = new FormData();
        formData.append("id", currentAskCotisant.id);

        const req = await axios.post(
            "http://88.209.83.32:5002/cotisation/removeAskCotisation",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        if (!req.data.error) {
            window.location.reload();
        }
    };

    const handleAcceptSomeone = async () => {
        // TODO: BUG
        //requete accept
        //handleCloseModalAskCotisant();
        const formData = new FormData();
        formData.append("id", currentAskCotisant.id);
        formData.append("identite", currentAskCotisant.identite);
        formData.append("email", currentAskCotisant.email);
        formData.append("tel", currentAskCotisant.tel);
        formData.append("promo", currentAskCotisant.promo);
        formData.append(
            "questions",
            JSON.stringify({
                cgu: currentAskCotisant.cgu,
                knowledge: currentAskCotisant.knowledge,
                club_rules: currentAskCotisant.club_rules,
            })
        );

        const req = await axios.post(
            "http://88.209.83.32:5002/cotisation/addCotisant",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        if (!req.data.error) {
            window.location.reload();
        }
    };

    useEffect(() => {
        refreshSceances();
        getCotisant();
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

                <Stack className="section">
                    <h3>Ajouter une sceance</h3>

                    <form
                        onSubmit={handleAddSceance}
                        className="section-in-section"
                    >
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

                        <Button
                            type="submit"
                            className="section-in-section-btn"
                        >
                            Valider
                        </Button>
                    </form>
                </Stack>

                <Typography textAlign="right" level="h3">
                    Seances
                </Typography>

                <Stack id="list-sceance">
                    {sceances.length > 0
                        ? sceances.map((v) => (
                              <Stack className="list-sceance-box">
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
                                      {v.participants.map((par) => (
                                          <li className="list-sceance-box-participant">
                                              <Typography
                                                  className="list-sceance-box-participant-text"
                                                  level="p"
                                                  endDecorator={
                                                      <Stack className="list-sceance-box-participant-actions">
                                                          <Button className="list-sceance-box-participant-btn cancel">
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
                        ? askCotisant.map((v) => (
                              <Stack
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
                        ? cotisants.map((v) => (
                              <Stack className="list-cotisant-box">
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
