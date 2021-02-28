import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuthToken } from "../../utils/auth";
import { LoadingContext, PreviewContext } from "../../utils/contexts";
import { addNewPost } from "../../utils/WebAPI";
import { Loading, Preview } from "../../components";
import FadeIn from "react-fade-in";

const Root = styled.div`
  position: relative;
  flex: 1;
  min-width: 645px;
  max-width: 700px;
  margin: auto;
  border-radius: 5px;
  padding: 10px 10px;
`;

const PostForm = styled.form`
  box-sizing: border-box;
  position: relative;
  min-width: 645px;
  margin-bottom: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 2em 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.div`
  align-self: center;
  color: #495464;
  font-size: 1.5em;
`;

const ErrorMsg = styled.div`
  z-index: 99;
  position: fixed;
  background-color: #e8e8e8;
  top: -128px;
  bottom: 0;
  left: 0;
  right: 0;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5em;
  line-height: 2em;
`;

const NewPostTitle = styled.input`
  width: 100%;
  margin-top: 3em;
  height: 2em;
`;
const NewPostBody = styled.textarea`
  width: 100%;
  margin-top: 3em;
`;

const NewPostBTNs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const NewPostSubmit = styled.button`
  width: 20%;
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
const NewPostPreview = styled.div`
  width: 20%;
  font-size: 1em;
  margin: 1em;
  background-color: #e8e8e8;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 0.5em;
  transition: all 0.4s;
  box-sizing: border-box;
  text-align: center;
  :hover {
    background-color: #ffffff;
    border: 2px solid #e8e8e8;
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
`;
const PreviewBackground = styled.div`
  z-index: 99;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: -128px;
  bottom: 0;
  left: 0;
  right: 0;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function NewPost() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory();

  const handleTitleChange = (e) => {
    setNewPostTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setNewPostBody(e.target.value);
  };

  const handleFocus = () => {
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addNewPost(newPostTitle, newPostBody)
      .then((res) => {
        setIsLoading(false);
        if (res.ok === 0) return setErrorMsg(res.message);
        history.push("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  // preview function
  const [previewClick, setPreviewClick] = useState(false);
  const handlePreviewClick = () => {
    setPreviewClick(true);
  };
  const handlePreviewCancel = () => {
    setPreviewClick(false);
  };

  // 登出狀態進到此頁面
  const token = getAuthToken();
  useEffect(() => {
    if (!token) {
      sleep(3000).then(() => {
        history.push("/");
      });
    }
  });

  if (!token) {
    return (
      <ErrorMsg>
        <div>請登入後再發新文章</div>
        <div>正在將您導向首頁</div>
      </ErrorMsg>
    );
  }

  return (
    <Root>
      <FadeIn>
        {isLoading && <Loading />}
        <PreviewContext.Provider value={{ newPostTitle, newPostBody }}>
          {previewClick && (
            <PreviewBackground onClick={handlePreviewCancel}>
              <Preview />
            </PreviewBackground>
          )}
        </PreviewContext.Provider>
        <PostForm onSubmit={handleSubmit}>
          <Title>新增文章</Title>
          <NewPostTitle
            value={newPostTitle}
            placeholder={errorMsg ? errorMsg : "請輸入標題"}
            onChange={handleTitleChange}
            onFocus={handleFocus}
          />
          <NewPostBody
            value={newPostBody}
            rows={30}
            placeholder={errorMsg ? errorMsg : "請輸入內文"}
            onChange={handleBodyChange}
            onFocus={handleFocus}
          ></NewPostBody>
          <NewPostBTNs>
            <NewPostSubmit>{isLoading ? "發布中" : "送出"}</NewPostSubmit>
            <NewPostPreview onClick={handlePreviewClick}>預覽</NewPostPreview>
          </NewPostBTNs>
        </PostForm>
      </FadeIn>
    </Root>
  );
}
