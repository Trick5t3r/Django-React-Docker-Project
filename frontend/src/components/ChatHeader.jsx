import React, { forwardRef } from "react";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import iconColored from './../assets/icon_colored.png';

export const headerHeight = 60;

const ChatHeader = forwardRef(({ onMenuClick }, ref) => {
    return (
        <AppBar
            ref={ref}
            position="fixed"
            elevation={0} // Supprime l'ombre par défaut
            sx={{
                backgroundColor: "background.default", // Utilise la couleur du fond
                color: "text.primary", // Texte avec la couleur principale
                borderBottom: "1px solid", // Ajout de la bordure
                borderColor: "divider", // Gris clair (couleur du thème pour les bordures)
                height: `${headerHeight}px`,
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMenuClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    ChatGPT Clone
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10%",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <img src={iconColored} alt="Icon" width="50" height="50" />
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default ChatHeader;
