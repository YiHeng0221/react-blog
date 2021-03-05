import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts";
import { setAuthToken } from "../../utils/auth";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../../RWD/RWD";
import Burger from "./Burger";
import useRWD from "../../utils/useRWD";

const Nav = styled.div`
  z-index: 10;
  display: flex;
  position: fixed;
  justify-content: space-around;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid lightgrey;
  background: white;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 128px;
  }
  ${MEDIA_QUERY_SM} {
    justify-content: start;
    align-items: center;
    height: 100px;
  }
`;
const NavBtns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERY_MD} {
    font-size: 0.8em;
  }
`;
const Title = styled(Link)`
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-size: 2em;
  cursor: pointer;
  color: #495464;
  text-decoration: none;
`;
const NavBtn = styled(Link)`
  text-decoration: none;
  padding: 10px;
  margin: 0 10px;
  display: flex;
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
  // RWD
  const device = useRWD();

  return (
    <Nav>
      <Title to="/">Heng's Blog</Title>
      {device === "mobile" && <Burger />}
      {(device === "tablet" || device === "PC") && (
        <NavBtns>
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

          <div>
            {!user && (
              <LoginBtn>
                <NavBtn to="/login" $active={location.pathname === "/login"}>
                  登入
                </NavBtn>
                <NavBtn
                  to="/register"
                  $active={location.pathname === "/register"}
                >
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
          </div>
        </NavBtns>
      )}
    </Nav>
  );
}
