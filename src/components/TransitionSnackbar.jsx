import React from "react";

import {
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


export default function TransitionSnackbar({snackbarState,openSnackbar,selectedLanguage}) {
  
 const handleClose = (event, reason) => {
   if (reason === "clickaway") {
     return;
   }

   openSnackbar(false);
 };

  return (
    <div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarState}
        onClose={handleClose}
        message={<Typography>{selectedLanguage} is not found</Typography>}
        autoHideDuration={1500}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
