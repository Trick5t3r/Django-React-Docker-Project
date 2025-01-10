import React, { useState, useEffect } from "react";
import api from "../../api";
import ChatSessionAvailable from "./ChatSessionAvailable";
import UserInfo from "./UserInfo";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Sidebar({ onNewSession, onSelectSession, onDeleteSession, drawerWidth }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = () => {
        api
            .get("/api/chatsessions/")
            .then((res) => res.data)
            .then((data) => {
                setSessions(data);
                console.log("Sessions fetched:", data);
            })
            .catch((err) => alert("Erreur lors du chargement des sessions : " + err));
    };

    const onUpdateSession = (sessionId) => {
        onDeleteSession(sessionId);
        fetchSessions();
    };

    const createSession = () => {
        api
            .post("/api/chatsessions/", {
                title: "Nouveau Chat",
                messages: [{ role: "assistant", content: "Que puis-je faire pour vous ?" }],
            })
            .then((res) => {
                if (res.status === 201) {
                    fetchSessions(); // Actualiser la liste des sessions
                    onNewSession(res.data.id); // Passer l'ID au parent
                } else {
                    alert("Échec de la création de la session.");
                }
            })
            .catch((err) => alert("Erreur lors de la création de la session : " + err));
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bgcolor: "background.default", // Couleur de fond
                width: `${drawerWidth}px`, // Occupe toute la largeur
                height: `calc(100% - 64px)`, // Occupe toute la hauteur
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid", // Bordure sur le côté droit
                borderColor: "divider", // Couleur cohérente avec le thème MUI
            }}
        >
            {/* Bouton de nouvelle session */}
            <Button
                startIcon={<AddCircleIcon />}
                onClick={createSession}
                sx={{
                    width: "100%",
                    borderRadius: 0,
                    justifyContent: "flex-start",
                    backgroundColor: "background.default",
                    color: "text.primary",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                Nouvelle Session
            </Button>
            <Divider />

            {/* Liste des sessions */}
            <List
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: 0,
                    p: 2,
                    scrollbarWidth: "none", // Cache la scrollbar pour Firefox
                    "&::-webkit-scrollbar": {
                        display: "none", // Cache la scrollbar pour Chrome, Safari
                    },
                    borderBottom: "none", // Supprime la bordure inférieure de la liste
                }}
            >
            {[...sessions].reverse().map((session) => (
                <ChatSessionAvailable
                    key={session.id}
                    session={session}
                    onSelect={onSelectSession}
                    onUpdate={onUpdateSession}
                />
            ))}

            </List>

            {/* Composant UserInfo fixé en bas */}
            <Box
                sx={{
                    position: "sticky",
                    bottom: 0, // Fixé tout en bas de l'écran
                    width: "100%",
                    bgcolor: "background.default",
                    marginTop: "auto", // Élimine l'espace entre la liste et UserInfo
                }}
            >
                <UserInfo />
            </Box>
        </Box>
    );
}

export default Sidebar;
