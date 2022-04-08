import React from "react";
import { useState } from "react";
import CustomerBackdrop from "./CustomerBackdrop";
import CustomerModal from "./CustomerModal";
import "./customerModal.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
export const InfoButton = ({ info }) => {
  const [showModal, setShowModal] = useState();
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <div>
      <VisibilityIcon
        style={{
          color: "#e16162",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={showModalHandler}
      />
      {showModal && <CustomerBackdrop onClick={closeModalHandler} />}
      {showModal && <CustomerModal info={info} onClose={closeModalHandler} />}
    </div>
  );
};
