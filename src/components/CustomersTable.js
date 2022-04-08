import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// import { InfoButton } from "./ViewModal";
import { useHistory } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import { InfoButton } from "./ShowModal";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
`;

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "E-mail",
    minWidth: 150,
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 120,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remarks",
    label: "Remarks",
    minWidth: 200,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 60,
  },
];
// for the pagination Part !

const useStyles = makeStyles({
  root: {
    width: "97%",
    maxHeight: "100vh",
    margin: "1rem",
    backgroundColor: "#abd1c6",
  },
  head: {},
  container: {
    maxHeight: 440,
  },
});
export default function CustomersTable({ customers }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = UserState();
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        `https://casperon.herokuapp.com/customers/${id}`,
        config
      );
      history.push("/");
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{ maxHeight: "100vh" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    backgroundColor: "#001e1d",
                    color: "#e8e4e6",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align={"left"}>{row.name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>
                  <TableCell align={"left"}>{row.contact}</TableCell>
                  <TableCell align={"left"}>{row.remarks}</TableCell>
                  <TableCell align={"left"}>{row.status}</TableCell>
                  <TableCell align={"right"}>
                    <ButtonWrapper>
                      <InfoButton info={row}></InfoButton>
                      <DeleteForeverIcon
                        style={{
                          color: "black",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(row._id);
                        }}
                      />
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
