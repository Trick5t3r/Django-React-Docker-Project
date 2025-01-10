import React, { useState, useEffect, forwardRef } from "react";
import { Box, Typography, List, ListItem, useTheme } from "@mui/material";
import FilesContextBox from "./FilesContextBox.jsx"

const SessionContextBox = forwardRef(({ chatsessionId }, ref) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.context_color.main,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        Contexte de la session
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1),
        }}
      >
        <FilesContextBox chatsessionId={chatsessionId} ref={ref}/>
      </Box>
    </Box>
  );
});

export default SessionContextBox;
