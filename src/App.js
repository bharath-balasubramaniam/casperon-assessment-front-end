import React from "react";
import "./App.css";
import { UserState } from "./context/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  const { user } = UserState();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/customers" /> : <LoginPage />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/customers" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/customers" /> : <RegisterPage />}
        </Route>
        <Route exact path="/customers">
          {!user ? <Redirect to="/login" /> : <CustomersPage />}
        </Route>
        <Route exact path="/customer/:id">
          {!user ? <Redirect to="/login" /> : <CustomerPage />}
        </Route>
        <Route path="*">
          {user ? <Redirect to="/customers" /> : <LoginPage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
