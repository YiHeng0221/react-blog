import { useContext, useState } from "react";
import FadeIn from "react-fade-in";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setAuthToken } from "../../utils/auth";
import { AuthContext } from "../../utils/contexts";
import { getMe, login } from "../../utils/WebAPI";

const LoginContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  color: #495464;
  display: flex;
  justify-content: center;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 645px;
  margin: 30px;
`;
const Input = styled.div`
  align-self: center;
  font-size: 1em;
  margin: 1em;
  border: 2px solid#ffffff;
  :active {
    outline: 0;
  }
`;
const SubmitButton = styled.button`
  width: 50%;
  font-size: 1em;
  margin: 1em;
  background-color: #e8e8e8;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 0.5em;
  transition: all 0.4s;
  box-sizing: border-box;
  :hover {
    background-color: #ffffff;
    border: 2px solid #e8e8e8;
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
`;
const BTNGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;
const ToRegister = styled(Link)`
  width: 50%;
  font-size: 1em;
  margin: 1em;
  background-color: #e8e8e8;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 0.5em;
  transition: all 0.4s;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  color: black;
  :hover {
    background-color: #ffffff;
    border: 2px solid #e8e8e8;
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
`;

const ErrorMsg = styled.a`
  font-size: 1em;
  color: red;
  align-self: center;
`;

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();
  const handleSubmit = (e) => {
    setErrorMsg(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMsg(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setErrorMsg(res.toString());
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };
  return (
    <FadeIn>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Input>
            帳號：
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Input>
          <Input>
            密碼：
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Input>
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
          <BTNGroup>
            <ToRegister to="/register">註冊</ToRegister>
            <SubmitButton type="submit">登入</SubmitButton>
          </BTNGroup>
        </LoginForm>
      </LoginContainer>
    </FadeIn>
  );
}
