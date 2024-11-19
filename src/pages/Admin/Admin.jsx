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
} from "@mui/joy";

export default function Admin() {
    const [participants, setParticipants] = useState([]);
    const [sceances, setSceances] = useState([]);
    const [date, setDate] = useState(null);
    const [places, setPlaces] = useState(10);

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handlePlaces = (e) => {
        setPlaces(e.target.value);
    };

    const handleAddSceance = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("date", date);
        formData.append("places", places);

        const req = await axios.post(
            "http://localhost:5002/calendar/addSceance",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            }
        );

        console.log(places, new Date(date));
        console.log(req.data);
    };

    const getSceanceDebug = async () => {
        const req = await axios.get("http://localhost:5002/calendar");

        for (let e in req.data.data) {
            const formData = new FormData();
            formData.append("id", req.data.data[e].id);

            const data = await axios.post(
                "http://localhost:5002/participant/participantBySeance",
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
        alert(
            `${data.identite}\nTel: ${data.numero_tel}\nEmail: ${data.email}`
        );
    };

    useEffect(() => {
        refreshSceances();
    }, []);

    return (
        <Layout>
            <Stack id="admin-lang">
                <h1 id="admin-title">Zone Administrateur</h1>

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
                                              {format(
                                                  v.date,
                                                  "EEEE dd MMMM yyyy",
                                                  {
                                                      locale: fr,
                                                  }
                                              )}
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
                                          <li
                                              onClick={() => {
                                                  handleClickParticipant(par);
                                              }}
                                              className="list-sceance-box-participant"
                                          >
                                              {par.identite}
                                          </li>
                                      ))}
                                  </ul>
                              </Stack>
                          ))
                        : null}
                </Stack>

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
            </Stack>
        </Layout>
    );
}
