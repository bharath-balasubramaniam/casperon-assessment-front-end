import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CustomerPage = () => {
  const { user } = UserState();
  const [customer, setCustomer] = useState();
  const location = useLocation();
  const history = useHistory();
  const fetchProduct = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://casperon.herokuapp.com/customers/${
          location.pathname.split("/")[2]
        }`,
        config
      );
      setCustomer(data);
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ backgroundColor: "#004643", height: "100vh" }}>
      <Navbar />
      <Formik
        initialValues={{
          remarks: customer?.remarks,
          status: "enquired",
        }}
        validate={(values) => {
          // const errors = {};
          // if (!values.remarks) errors.name = "Remarks is Required";
          // return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            await axios.put(
              `https://casperon.herokuapp.com/customers/${
                location.pathname.split("/")[2]
              }`,
              { ...values },
              config
            );
          } catch (error) {
            console.log(error.message);
          }
          history.push("/customers");
        }}
      >
        {() => {
          return (
            <div
              className="container"
              style={{ marginTop: "7vh", backgroundColor: "#004643" }}
            >
              <div className="row">
                <div className="col-12">
                  <Form>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="name" style={{ color: "#fffffe" }}>
                          Name
                        </label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          value={customer?.name}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="name" />
                      </div>
                      <div className="col">
                        <label htmlFor="email" style={{ color: "#fffffe" }}>
                          Email
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="text"
                          value={customer?.email}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="contact" style={{ color: "#fffffe" }}>
                          Contact number
                        </label>
                        <Field
                          id="contact"
                          name="contact"
                          type="text"
                          value={customer?.contact}
                          disabled
                          className="form-control"
                        />
                        <ErrorMessage name="contact" />
                      </div>
                      <div className="col">
                        <label htmlFor="status" style={{ color: "#fffffe" }}>
                          Customer Status
                        </label>
                        <Field
                          as="select"
                          name="status"
                          id="status"
                          className="form-control"
                        >
                          <option value="enquired">enquired</option>
                          <option value="pending">pending</option>
                          <option value="resolved">resolved</option>
                        </Field>
                      </div>
                    </div>
                    <div className="row" style={{ margin: "10px 0px" }}>
                      <div className="col">
                        <label htmlFor="remarks" style={{ color: "#fffffe" }}>
                          Add Remarks if you wish!
                        </label>
                        <div></div>
                        <Field
                          as="textarea"
                          name="remarks"
                          id="remarks"
                          placeholder={customer?.remarks}
                          style={{ height: "15vh", width: "50%" }}
                        />
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      <div className="Col" style={{ margin: "7px 10px" }}>
                        <button type="submit" className="btn btn-primary">
                          submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CustomerPage;
