import React from "react";
import { Link } from "react-router-dom";
function CustomerModal({ info, onClose }) {
  return (
    <div
      style={{
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "6px",
        backgroundColor: "white",
        padding: "1rem",
        textAlign: "center",
        width: "30rem",
        zIndex: "100",
        position: "fixed",
        top: "20vh",
        left: "calc(50% - 15rem)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        Product Information
      </h1>
      <div className="modal-wrapper">
        <p className="info-title">
          Name : <span className="info"> {info.name}</span>
        </p>
        <p className="info-title">
          Mobile no : <span className="info"> {info.contact}</span>
        </p>
        <p className="info-title">
          E-mail : <span className="info"> {info.email}</span>
        </p>
        <p className="info-title">
          Status : <span className="info"> {info.status}</span>
        </p>
        <p className="info-title">
          Remarks : <span className="info"> {info.remarks}</span>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link to={`/customer/${info._id}`}>
            <button className="btn">Edit</button>
          </Link>
          <button className="btn btn--alt" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerModal;
