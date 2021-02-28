import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts";
import { setAuthToken } from "../../utils/auth";

const Nav = styled.div`
  height: 128px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid lightgrey;
  z-index: 99;
  background: white;
`;
const NavBtns = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled(Link)`
  font-size: 2.5em;
  margin: 30px;
  cursor: pointer;
  color: #495464;
  text-decoration: none;
`;
const NavBtn = styled(Link)`
  text-decoration: none;
  display: flex;
  margin: 20px;
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  color: #495464;
  transition: all 0.3s;
  :hover {
    background: #e8e8e8;
    cursor: pointer;
    color: #000000;
    transform: scale(1.2);
  }
  ${(props) =>
    props.$active &&
    `
  background: #e8e8e8;
  `}
`;
const LoginBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  color: #495464;
`;

export default function Navbar() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  return (
    <Nav>
      <NavBtns>
        <Title to="/">Heng's Blog</Title>
        <NavBtn to="/posts" $active={location.pathname === "/posts"}>
          所有文章
        </NavBtn>
        {user && (
          <NavBtn to="/newPost" $active={location.pathname === "/newPost"}>
            新增文章
          </NavBtn>
        )}
        <NavBtn to="/board" $active={location.pathname === "/board"}>
          留言板
        </NavBtn>
      </NavBtns>

      {!user && (
        <LoginBtn>
          <NavBtn to="/login" $active={location.pathname === "/login"}>
            登入
          </NavBtn>
          <NavBtn to="/register" $active={location.pathname === "/register"}>
            註冊
          </NavBtn>
        </LoginBtn>
      )}
      {user && (
        <LoginBtn>
          <NavBtn to="/" onClick={handleLogout}>
            登出
          </NavBtn>
        </LoginBtn>
      )}
    </Nav>
  );
}
