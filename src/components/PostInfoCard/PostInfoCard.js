import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts";
import { MEDIA_QUERY_MD } from "../../RWD/RWD";

const PostContainer = styled.div`
  position: relative;
  max-width: 645px;
  margin: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  color: #495464;
  transition-duration: 0.5s;
  :hover {
    background: #e8e8e8;
    cursor: pointer;
    color: #000000;
    transform: scale(1.2);
  }
`;
const PostTitle = styled.div`
  display: block;
  text-decoration: none;
  line-height: 1.8em;
  color: #495464;
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  ${MEDIA_QUERY_MD} {
    font-size: 0.8em;
  }
`;

const PostInfo = styled.div`
  background: #495464;
  color: #f4f4f2;
  margin-bottom: 10px;
  ${MEDIA_QUERY_MD} {
    font-size: 0.5em;
  }
`;
const PostDate = styled.div`
  margin: 0 20px;
`;

const LinkStyle = {
  textDecoration: "none",
};
const SmallPostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SmallPostTitle = styled(Link)`
  text-decoration: none;
  line-height: 1.5em;
  color: #495464;
  display: block;
  font-size: 1em;
  margin: 0.5em;
  box-sizing: border-box;
  font-weight: bold;
  textdecoration: "none";
  ${MEDIA_QUERY_MD} {
    font-size: 0.5em;
  }
`;
const DeleteButton = styled.div`
  min-width: 4em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  background-color: #f38181;
  border-radius: 10px;
  padding: 0.5em;
  color: white;
  cursor: pointer;
  ${MEDIA_QUERY_MD} {
    font-size: 0.5em;
  }
`;

export function SmallPostInfoCard({ post, handleDeletePost }) {
  const { user } = useContext(AuthContext);
  return (
    <PostContainer key={post.id}>
      <SmallPostWrapper>
        <SmallPostTitle to={`/post/${post.id}`}>{post.title}</SmallPostTitle>
        {user && user.id === post.userId && (
          <DeleteButton onClick={() => handleDeletePost(post.id)}>
            刪除
          </DeleteButton>
        )}
      </SmallPostWrapper>
    </PostContainer>
  );
}

export function PostInfoCard({ post }) {
  return (
    <PostContainer key={post.id}>
      <Link to={`/post/${post.id}`} style={LinkStyle}>
        <PostTitle>{post.title}</PostTitle>
        <PostInfo>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostInfo>
      </Link>
    </PostContainer>
  );
}
