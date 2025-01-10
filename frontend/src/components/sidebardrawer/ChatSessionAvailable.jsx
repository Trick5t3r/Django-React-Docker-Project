import React from "react";
import api from "../../api";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function ChatSessionAvailable({ session, onSelect, onUpdate }) {
    const deleteSession = (sessionId) => {
        api
            .delete(`/api/chatsessions/${sessionId}/`)
            .then(() => {
                onUpdate(sessionId);
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression :", err);
            });
    };

    return (
        <ListItem
            sx={{
                bgcolor: "background.default", // Couleur de fond du thème
                borderRadius: 1,
                mb: 1, // Espace entre les items
                "&:hover": {
                    bgcolor: "action.hover", // Couleur au survol
                },
            }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSession(session.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Box
                onClick={() => onSelect(session.id)}
                sx={{ cursor: "pointer", width: "100%" }}
            >
                <ListItemText primary={session.title} />
            </Box>
        </ListItem>
    );
}

export default ChatSessionAvailable;

