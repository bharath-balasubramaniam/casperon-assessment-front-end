import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import logedin from "../assets/login.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #004643;
  align-items: center;
  justify-content: center;
`;
const ImgWrapper = styled.div`
  flex: 5;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Img = styled.img`
  max-width: 50%;
`;
const FormWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex: 3;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  @media only screen and (max-width: 860px) {
    width: 90%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin: 1rem 0rem;
  padding: 0.5rem;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #fffffe;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px 0px 5px;
  padding: 10px;
  color: #001e1d;
  font-weight: 600;
  font-size: 15px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: #f9bc60;
  margin-top: 1rem;
  cursor: pointer;
  color: #001e1d;
  font-size: 17px;
  font-weight: 600;
`;
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return alert("Please all the fields!");
    }
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "https://casperon.herokuapp.com/auth/login/",
        { email, password },
        config
      );
      document.cookie = `userInfo = ${JSON.stringify(data)}`;
      setEmail("");
      setPassword("");
      history.push("/");
      history.go(0);
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Container>
      <ImgWrapper>
        <Img src={logedin} alt="pic.png" />
      </ImgWrapper>
      <FormWrapper>
        <div>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="user e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonWrapper>
              <Button onClick={handleClick}>Log in</Button>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </ButtonWrapper>
          </Form>
        </div>
      </FormWrapper>
    </Container>
  );
}

export default LoginPage;
