import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Sidebar from "./Sidebar.jsx";
import { SwipeableDrawer } from "@mui/material";

export const drawerWidth = 240;

function DrawerSideBar({
  mobileOpen,
  handleDrawerToggle,
  headerHeight,
  currentSession,
  setCurrentSession,
  refreshSession,
  setMessages,
  permanentOpen,
  setPermanentOpen,
}) {
  const drawer = (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100%",
      }}
    >
      <Divider />
      <Sidebar
        onNewSession={(sessionId) => {
          setCurrentSession(sessionId);
          refreshSession();
        }}
        onSelectSession={(sessionId) => {
          setCurrentSession(sessionId);
          refreshSession();
        }}
        onDeleteSession={(sessionId) => {
          if (sessionId === currentSession) {
            setCurrentSession(null);
            setMessages([]);
          }
        }}
        drawerWidth={drawerWidth}
      />
    </Box>
  );

  return (
    <>
    <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: headerHeight,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>
      <Drawer
        variant="persistent"
        open={permanentOpen}
        onClose={() => setPermanentOpen(false)}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: headerHeight,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer></>
  );
}

export default DrawerSideBar;
