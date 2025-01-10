import React, { useState, useEffect, forwardRef } from 'react';
import { IconButton, Drawer } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SessionContextBox from './SessionContextBox.jsx';
import { headerHeight } from "../ChatHeader.jsx";

let contextdrawerwidth = 0; // Variable exportée pour stocker la largeur en pixels

const DrawerContext = forwardRef(({ isOpen, handleContextToggle, chatsessionId }, ref) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Calcul initial de la largeur
    contextdrawerwidth = Math.floor(screenWidth * 0.5);

    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);

  const toggleDrawer = (open) => () => {
    handleContextToggle(open);
  };

  return (
    <>
        {!isOpen && <IconButton
          onClick={toggleDrawer(true)}
          sx={{ position: 'fixed', right: 16, top: `calc(50% + ${headerHeight}px)`, transform: 'translateY(-50%)', zIndex: 1300 }}
        >
          <ArrowBackIosIcon />
        </IconButton>}

        {/* Drawer à droite */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer(false)}
          variant="persistent"
          PaperProps={{
            sx: {
              width: `${contextdrawerwidth}px`,
              mt: `${headerHeight}px`
            }, // Définit la largeur de la barre à 50% de l'écran en pixels
          }}
        >
          {/* Bouton pour fermer le Drawer, attaché à gauche */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1300 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <SessionContextBox chatsessionId={chatsessionId} ref={ref}/>
        </Drawer>
    </>
  );
});

export default DrawerContext;
export { contextdrawerwidth };
