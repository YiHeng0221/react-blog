import { useContext, useState } from "react";
import FadeIn from "react-fade-in";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../../components";
import { setAuthToken } from "../../utils/auth";
import { AuthContext } from "../../utils/contexts";
import { getMe, register } from "../../utils/WebAPI";

const RegisterContainer = styled.div`
  position: relative;
  min-width: 645px;
  margin-bottom: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  color: #495464;
  display: flex;
  justify-content: center;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
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

const ErrorMsg = styled.a`
  font-size: 1em;
  color: red;
  align-self: center;
`;

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false);
        return setErrorMsg(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        setIsLoading(false);
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
      {isLoading && <Loading />}
      <RegisterContainer>
        <RegisterForm onSubmit={handleSubmit}>
          <Input>
            暱稱：
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Input>
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
          <SubmitButton type="submit">註冊</SubmitButton>
        </RegisterForm>
      </RegisterContainer>
    </FadeIn>
  );
}
