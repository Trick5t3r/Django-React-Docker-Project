import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { USERNAME } from "../../constants";

function UserInfo({}) {
  const [userName, setuserName] = useState("Undefined");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  useEffect(() => {
    setuserName(localStorage.getItem(USERNAME));
    }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider", // Ligne séparatrice
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main", marginRight: 2 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="body1" color="text.primary">
          {userName}
        </Typography>
      </Box>
      <IconButton color="primary" onClick={handleLogout} aria-label="logout">
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}

export default UserInfo;
