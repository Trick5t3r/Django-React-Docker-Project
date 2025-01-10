import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import api from "../../api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const FilesContextBox = forwardRef(({ chatsessionId }, ref) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useImperativeHandle(ref, () => ({
        fetchFiles,
    }));

    useEffect(() => {
        if (chatsessionId) {
            fetchFiles();
        }
    }, [chatsessionId]);

    const fetchFiles = () => {
        setLoading(true);
        setError(null);
        api
            .get(`/api/chatsessions/${chatsessionId}/files/`)
            .then((res) => res.data)
            .then((data) => {
                setFiles(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erreur lors du chargement des fichiers.");
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (files.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography>Aucun fichier trouvé pour cette session.</Typography>
            </Box>
        );
    }

    const boxSize = 120; // Define a fixed size for all boxes

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Fichiers de la session :
            </Typography>
            <ImageList cols={3} gap={8}>
                {files.map((fileData) => (
                    <ImageListItem key={fileData.id} sx={{ width: boxSize, height: boxSize }}>
                        {fileData.resourcetype === "ImageFile" ? (
                            <a href={fileData.file} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={fileData.file}
                                    alt={`Image ${fileData.id}`}
                                    loading="lazy"
                                    style={{
                                        borderRadius: "8px",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </a>
                        ) : (
                            <a
                                href={fileData.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: boxSize,
                                        bgcolor: "gray_color.main",
                                        borderRadius: "8px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                        wordWrap: "break-word",
                                        overflowWrap: "break-word", // Gère les mots longs
                                        wordBreak: "break-word", // Permet de casser les mots si nécessaire
                                        maxWidth: "100%", // Empêche le débordement horizontal
                                        }}
                                    >
                                        {fileData.title || "Fichier sans titre"}
                                    </Typography>
                                </Box>
                            </a>
                        )}
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
});

export default FilesContextBox;
