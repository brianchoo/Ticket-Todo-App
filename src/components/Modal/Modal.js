import React from "react";
import ReactModal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const Modal = ({ isOpen, modalHandler, children }) => {
  return (
    <ReactModal
      className="Modal"
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={modalHandler}
      ariaHideApp={false}
    >
      <Box
        className="modal-content"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "1rem",
            marginRight: "1rem",
          }}
        >
          <CloseIcon onClick={modalHandler} style={{ cursor: "pointer" }} />
        </Box>
        {children}
      </Box>
    </ReactModal>
  );
};

export default Modal;
