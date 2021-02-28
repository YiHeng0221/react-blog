import styled from "styled-components";
import React, { useContext } from "react";
import { PreviewContext } from "../../utils/contexts";
import FadeIn from "react-fade-in";

const PostContainer = styled.div`
  margin-top: 256px;
  width: 645px;
  margin-bottom: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  color: #495464;
  opacity: 100%;
  background-color: white;
  min-height: 300px;
  overflow: scroll;
`;
const PostTitle = styled.div`
  text-decoration: none;
  line-height: 1.8em;
  color: #495464;
  display: block;
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
`;

const PostInfo = styled.div`
  background: #495464;
  color: #f4f4f2;
  margin-bottom: 10px;
`;
const PostDate = styled.a`
  margin: 0 20px;
`;
const ArticleContent = styled.div`
  line-height: 2em;
`;

export default function Preview() {
  const { newPostTitle, newPostBody } = useContext(PreviewContext);
  const time = new Date().toLocaleString();

  return (
    <FadeIn>
      <PostContainer>
        <PostTitle>{newPostTitle}</PostTitle>
        <PostInfo>
          <PostDate>{time}</PostDate>
        </PostInfo>
        <ArticleContent>{newPostBody}</ArticleContent>
      </PostContainer>
    </FadeIn>
  );
}
