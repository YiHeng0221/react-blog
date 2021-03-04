import { useContext, useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import { Loading } from "../../components";
import { MEDIA_QUERY_MD } from "../../RWD/RWD";
import { LoadingContext } from "../../utils/contexts";
import { addNewComment, getComments } from "../../utils/WebAPI";

const BoardForm = styled.form`
  position: relative;
  margin: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  padding-top: 2em;
  color: #495464;
  transition-duration: 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoardListContainer = styled.div``;
const BoardNickname = styled.input`
  width: 100%;
  border: 1px solid #495464;
  box-sizing: border-box;
  border-radius: 5px;
  background: #e8e8e8;
  margin: 1em;
  height: 2em;
  :focus {
    outline-style: none;
    background: white;
  }
`;
const BoardTextarea = styled.textarea`
  width: 100%;
  min-height: 10em;
  padding: 10px;
  border: 1px solid #495464;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #e8e8e8;
  margin: 1em;
  :focus {
    outline-style: none;
    background: white;
  }
`;
const BoardSubmitButton = styled.button`
  font-size: 1em;
  margin-top: 0.5em;
  width: 15em;
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
const Comment = styled.div`
  position: relative;
  margin: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  color: #495464;
  transition-duration: 0.5s;
  display: flex;
  :hover {
    background: #e8e8e8;
    color: #000000;
    transform: scale(1.2);
  }
  ${MEDIA_QUERY_MD} {
    padding: 5px 15px;
  }
`;

const CommentBody = styled.div`
  margin-left: 20px;
  overflow-wrap: anywhere;
  max-width: 500px;
`;
const CommentAvatar = styled.div`
  min-width: 50px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: #e4f0fb;
  ${MEDIA_QUERY_MD} {
    min-width: 25px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    margin-top: 0.5em;
  }
`;

const CommentUserInfo = styled.div`
  display: flex;
  text-align: left;
  max-width: 250px;
  color: black;
  font-weight: bold;
  overflow: hidden;
  align-items: center;
`;

const CommentInfo = styled.div`
  display: flex;
`;

const CommentDate = styled.span`
  color: #a0a0a0;
  margin-left: 20px;
  align-items: center;
  display: flex;
`;
const CommentContent = styled.p`
  margin-top: 20px;
  max-width: 100%;
  white-space: break-spaces;
`;

const ErrorMessage = styled.div`
  margin: 2em;
  color: red;
`;

function Comments({ comment, handleCommentDelete }) {
  return (
    <FadeIn>
      <Comment>
        <CommentAvatar />
        <CommentBody>
          <CommentInfo>
            <CommentUserInfo>{comment.nickname}</CommentUserInfo>
            <CommentDate>
              {new Date(comment.createdAt).toLocaleString()}
            </CommentDate>
          </CommentInfo>
          <CommentContent>{comment.body}</CommentContent>
        </CommentBody>
      </Comment>
    </FadeIn>
  );
}

export default function Board() {
  const [comments, setComments] = useState(null);
  const [CommentApiErr, setCommentApiErr] = useState(null);
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [createCommentErr, setCreateCommentErr] = useState(null);
  // avoid the unlimited submit
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  // comment value
  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
  };

  // username value
  const handleUsernameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleInputFocus = (e) => {
    setCreateCommentErr(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    addNewComment(nickname, comment)
      .then((data) => {
        setIsLoading(false);
        if (data.ok === 0) {
          setCreateCommentErr(data.message);
        }
        setComment("");
        setNickname("");
        getComments().then((data) => {
          setComments(data);
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isSubscribe = true;
    setIsLoading(true);
    getComments()
      .then((data) => {
        if (isSubscribe) {
          setComments(data);
        }
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        if (isSubscribe) {
          setCommentApiErr(err.message);
        }
      });
    return () => (isSubscribe = false);
  }, [setIsLoading]);
  return (
    <FadeIn>
      {isLoading && <Loading />}
      <BoardForm onSubmit={handleFormSubmit}>
        您的暱稱：
        <BoardNickname
          value={nickname}
          onChange={handleUsernameChange}
          onFocus={handleInputFocus}
        />
        您的留言：
        <BoardTextarea
          value={comment}
          onChange={handleTextAreaChange}
          onFocus={handleInputFocus}
          rows="20"
        />
        {createCommentErr && (
          <ErrorMessage>Your username or comment is empty!</ErrorMessage>
        )}
        <BoardSubmitButton>發送留言</BoardSubmitButton>
      </BoardForm>
      {CommentApiErr && (
        <ErrorMessage>
          Something went wrong.
          <br />
          {CommentApiErr.toString()}
        </ErrorMessage>
      )}
      {comments && comments.length === 0 && <h1>目前沒有留言，快來新增吧！</h1>}
      <BoardListContainer>
        {comments &&
          comments.map((comment) => (
            <Comments key={comment.id} comment={comment}></Comments>
          ))}
      </BoardListContainer>
    </FadeIn>
  );
}
