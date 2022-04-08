import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CustomersTable from "../components/CustomersTable";
import { UserState } from "../context/UserProvider";
import FormField from "../components/FormField";

function CustomersPage() {
  const [status, setStatus] = useState();
  const [customers, setCustomers] = useState();
  const { user } = UserState();
  useEffect(() => {
    handleStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleStatus = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (status) {
        const { data } = await axios.get(
          `https://casperon.herokuapp.com/customers?status=${status}`,
          config
        );
        setCustomers(data);
      } else {
        const { data } = await axios.get(
          `https://casperon.herokuapp.com/customers/`,
          config
        );
        setCustomers(data);
      }
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <div style={{ width: "100vw", height: "100%", backgroundColor: "#004643" }}>
      <Navbar />
      <div>
        <FormField />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <label htmlFor="status" style={{ color: "#e8e4e6" }}>
          Customer Status :{" "}
        </label>
        <select
          name="status"
          id="status"
          onChange={(e) => setStatus(e.target.value)}
          style={{ maxWidth: "250px", marginLeft: "10px" }}
        >
          <option value="enquired">enquired</option>
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
        </select>
        <button
          style={{
            font: "inherit",
            padding: "0.2rem 1.2rem",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: "#e16162",
            color: "white",
            border: "1px solid #a4f177",
            margin: "0rem 1rem",
          }}
          onClick={handleStatus}
        >
          Submit
        </button>
      </div>
      <CustomersTable customers={customers} />
    </div>
  );
}

export default CustomersPage;
