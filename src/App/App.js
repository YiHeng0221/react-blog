import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage,
  Login,
  Post,
  NewPost,
  Posts,
  Board,
  Register,
} from "../pages";
import { Loading, Navbar } from "../components";
import { AuthContext, LoadingContext } from "../utils/contexts";
import { getMe } from "../utils/WebAPI";
import { getAuthToken } from "../utils/auth";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../RWD/RWD";

const Root = styled.div`
  margin: 5% auto;
  box-model: border-box;
  display: flex;
  height: 100%;
  width: 100%;
  padding-top: 64px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${MEDIA_QUERY_MD} {
    padding-top: 128px;
  }
  ${MEDIA_QUERY_SM} {
    padding-top: 100px;
  }
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Root>
          <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <Loading />}
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/posts">
                <Posts />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/newpost">
                <NewPost />
              </Route>
              <Route exact path="/post/:id">
                <Post />
              </Route>
              <Route exact path="/board">
                <Board />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </LoadingContext.Provider>
        </Root>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
