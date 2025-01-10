import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import MessageBubble from "./MessageBubble.jsx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { headerHeight } from "../ChatHeader.jsx";
import {drawerWidth} from "../sidebardrawer/DrawerSideBar.jsx";
import {contextdrawerwidth} from "../contextDrawer/DrawerContext.jsx"

// Ajout de forwardRef pour transmettre un ref au composant enfant
const ChatBox = forwardRef(
  ({ messages, sidebarOpen, contextOpen, messageinputHeight }, ref) => {
    const chatBoxRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Fonction pour défiler vers le bas
    const scrollToBottom = () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // Détecter si l'utilisateur est déjà en bas
    const handleScroll = () => {
      if (chatBoxRef.current) {
        const isAtBottom =
          chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <=
          chatBoxRef.current.clientHeight + 50; // Tolérance de 50px
        setShowScrollButton(!isAtBottom);
      }
    };

    // Expose la fonction scrollToBottom au parent via le ref
    useImperativeHandle(ref, () => ({
      scrollToBottom,
    }));

    useEffect(() => {
      const chatBox = chatBoxRef.current;
      if (chatBox) {
        chatBox.addEventListener("scroll", handleScroll);
        return () => chatBox.removeEventListener("scroll", handleScroll);
      }
    }, []);

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    return (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: `calc(100dvh - ${messageinputHeight}px - ${headerHeight}px - 20px)`,
          overflowY: "auto", // Permet le défilement vertical
          p: 0,
          bgcolor: "background.default", // Couleur de fond
          scrollbarWidth: "none", // Cache la barre de défilement
          margin: "0 auto", // Centre la boîte horizontalement
          maxWidth: { xs: `calc(100% - ${contextOpen ? contextdrawerwidth : 0}px)`, sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px - ${contextOpen ? contextdrawerwidth : 0}px)` }, // Dynamique
          ml: { xs: 0, sm: `${sidebarOpen ? drawerWidth : 0}px`}, // Marges dynamiques en fonction du drawer gauche
          mr: `${contextOpen ? contextdrawerwidth : 0}px`, // Marges dynamiques en fonction du drawer droit
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}

        ref={chatBoxRef}
      >
        {/* Messages */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}

        {/* Bouton flottant */}
        {showScrollButton && (
          <IconButton
            onClick={scrollToBottom}
            sx={{
              position: "fixed",
              bottom: `calc(${messageinputHeight}px + 10px)`,
              left: { xs: `calc((100% - ${contextOpen ? contextdrawerwidth : 0}px)/2)`, sm: `calc( (100% + ${sidebarOpen ? drawerWidth : 0}px - ${contextOpen ? contextdrawerwidth : 0}px)/2)` }, // Ajuste la position selon le drawer droit
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              boxShadow: 2,
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        )}
      </Box>
    );
  }
);

export default ChatBox;
