import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { setAuthToken } from "../../../utils/auth";
import { AuthContext } from "../../../utils/contexts";

const BurgerStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background: #495464;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const BurgerWrapper = styled.div`
  width: 100%;
`;

const MenuBtns = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 99;
  width: 100%;
`;
const MenuBtn = styled(Link)`
  text-decoration: none;
  background: white;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
  display: flex;
  font-size: 1em;
  align-items: center;
  padding: 10px 0;
  justify-content: center;
  cursor: pointer;
  color: #495464;
  transition: all 0.3s;

  :hover {
    background: #e8e8e8;
    cursor: pointer;
    color: #000000;
  }
`;
const MenuLoginBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
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
    <MenuBtns>
      <MenuBtn to="/posts" $active={location.pathname === "/posts"}>
        所有文章
      </MenuBtn>
      {user && (
        <MenuBtn to="/newPost" $active={location.pathname === "/newPost"}>
          新增文章
        </MenuBtn>
      )}
      <MenuBtn to="/board" $active={location.pathname === "/board"}>
        留言板
      </MenuBtn>

      {!user && (
        <MenuLoginBtn>
          <MenuBtn to="/login" $active={location.pathname === "/login"}>
            登入
          </MenuBtn>
          <MenuBtn to="/register" $active={location.pathname === "/register"}>
            註冊
          </MenuBtn>
        </MenuLoginBtn>
      )}
      {user && (
        <MenuLoginBtn>
          <MenuBtn to="/" onClick={handleLogout}>
            登出
          </MenuBtn>
        </MenuLoginBtn>
      )}
    </MenuBtns>
  );
};

export default function Burger() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <BurgerWrapper>
      <BurgerStyle onClick={handleOpen} open={open}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerStyle>
      {open && <Menu />}
    </BurgerWrapper>
  );
}
