import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { drawerWidth } from "./sidebardrawer/DrawerSideBar.jsx";
import { contextdrawerwidth } from "./contextDrawer/DrawerContext.jsx";
import api from "../api";

export const messageinputHeight = 80;

function MessageInput({ onSend, onUploadFile, sessionId, sidebarOpen, contextOpen, onHeightChange }) {
  const [input, setInput] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Liste des fichiers uploadés

  const inputRef = useRef(null);
  const boxRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== "" || uploadedFiles.length > 0) {
      onSend({ message: input, files: uploadedFiles }); // Envoie le message et les fichiers
      setInput(""); // Efface le champ d'entrée
      setUploadedFiles([]); // Réinitialise la liste des fichiers après envoi
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend(); // Envoie le message lorsqu'on appuie sur Entrée
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileData = await onUploadFile(file); // Appelle la fonction parent pour gérer l'upload du fichier et obtenir les données
        setUploadedFiles((prev) => [...prev, { file, fileData }]); // Ajoute le fichier à la liste
      } catch (error) {
        console.error("Erreur lors de l'upload du fichier:", error);
      }
    }
  };

  const handleRemoveFile = async (index) => {
    const fileToRemove = uploadedFiles[index];
    try {
      await api.delete(`/api/fileupload/${fileToRemove.fileData.id}/`); // Appeler l'API pour supprimer le fichier
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index)); // Supprime le fichier de la liste
    } catch (error) {
      console.error("Erreur lors de la suppression du fichier:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardVisible = window.innerHeight < document.documentElement.clientHeight;
      setIsKeyboardOpen(isKeyboardVisible);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (boxRef.current && onHeightChange) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const rect = boxRef.current.getBoundingClientRect();
          onHeightChange(rect.height); // Retourne la hauteur réelle de l'élément
        }
      });

      observer.observe(boxRef.current);

      return () => {
        observer.disconnect(); // Nettoyage de l'observateur
      };
    }
  }, [onHeightChange]);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "fixed",
        bottom: isKeyboardOpen ? `${messageinputHeight}px` : 0,
        left: { xs: 0, sm: `${sidebarOpen ? drawerWidth : 0}px` },
        width: { xs: `calc(100% - ${contextOpen ? contextdrawerwidth : 0}px)`, sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px - ${contextOpen ? contextdrawerwidth : 0}px)` },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        bgcolor: "background.default",
        zIndex: 1000,
        transition: "bottom 0.3s ease",
      }}
    >
      {/* Prévisualisation des fichiers */}
      {uploadedFiles.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 1,
          }}
        >
          {uploadedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.200",
              }}
            >
              {file.fileData.resourcetype === "ImageFile" ? (
                <img
                  src={file.fileData.file}
                  alt={`Uploaded Preview ${index}`}
                  style={{
                    width: "100%",
                    height: "100%,",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  {file.fileData.title}
                </Box>
              )}
              <IconButton
                onClick={() => handleRemoveFile(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  '&:hover': {
                    bgcolor: "rgba(255, 255, 255, 1)",
                  },
                  padding: 0.5,
                }}
              >
                <CloseIcon color="error" fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Champ de saisie */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          multiline
          maxRows={10}
          sx={{
            bgcolor: "background.default",
            borderRadius: 1,
            overflow: "auto",
          }}
        />

        {/* Bouton d'upload de fichier */}
        <IconButton
          color="primary"
          component="label"
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            borderRadius: "50%",
            '&:hover': {
              bgcolor: "secondary.dark",
            },
          }}
        >
          <UploadFileIcon />
          <input
            type="file"
            hidden
            onChange={handleUpload}
          />
        </IconButton>

        {/* Icône d'envoi */}
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            borderRadius: "50%",
            '&:hover': {
              bgcolor: "primary.dark",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MessageInput;
