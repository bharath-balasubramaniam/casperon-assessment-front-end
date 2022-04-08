import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { useHistory } from "react-router-dom";
const validateEmail = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
function FormField() {
  const { user } = UserState();
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        contact: "",
        remarks: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Name is Required";
        if (!values.email) {
          errors.email = "E-mail is Required";
        } else if (!validateEmail.test(values.email)) {
          errors.email = "E-mail is invalid";
        }
        if (!values.contact) errors.contact = "Contact number is Required";
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(true);
        }, 500);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(
            "https://casperon.herokuapp.com/customers/",
            { ...values },
            config
          );
          console.log(data);
          history.push("/customers");
          history.go(0);
        } catch (error) {
          console.log(error.message);
        }
        console.log(values);
        alert("The customer is saved!");
      }}
    >
      {({ isSubmitting, handleReset }) => {
        return (
          <div className="container" style={{ marginTop: "7vh" }}>
            <div className="row">
              <div className="col-12">
                <Form>
                  <div className="row" style={{ margin: "5px 0px" }}>
                    <div className="col">
                      <label htmlFor="name" style={{ color: "#fffffe" }}>
                        Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
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
                        className="form-control"
                      />
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="row" style={{ margin: "5px 0px" }}>
                    <div className="col">
                      <label htmlFor="contact" style={{ color: "#fffffe" }}>
                        Contact number
                      </label>
                      <Field
                        id="contact"
                        name="contact"
                        type="text"
                        className="form-control"
                      />
                      <ErrorMessage name="contact" />
                    </div>
                    <div className="col">
                      <label htmlFor="remarks" style={{ color: "#fffffe" }}>
                        Add Remarks if you wish!
                      </label>
                      <div></div>
                      <Field
                        as="textarea"
                        name="remarks"
                        id="remarks"
                        style={{ height: "15vh", width: "50%" }}
                      />
                    </div>
                  </div>

                  <br />
                  <div className="row">
                    <div className="Col" style={{ margin: "7px" }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ backgroundColor: "#f9bc60", color: "#001e1d" }}
                      >
                        submit
                      </button>
                      <button
                        type="reset"
                        onClick={handleReset}
                        className="btn btn-danger"
                        style={{
                          marginLeft: "20px",
                          color: "#001e1d",
                          backgroundColor: "#e16162",
                        }}
                      >
                        Reset
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
  );
}
export default FormField;
