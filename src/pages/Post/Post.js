import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSinglePost } from "../../utils/WebAPI";
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

const ArticleContent = styled.div`
  line-height: 2em;
`;

const PostContainer = styled.div`
  position: relative;
  min-width: 645px;
  margin-bottom: 20px;
  border: #bbbfca 1px solid;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  color: #495464;
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
const PostClassify = styled.a`
  margin: 0 20px;
`;

export default function Post() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function runGetSinglePost() {
      const data = await getSinglePost(id);
      setPost(data);
    }
    runGetSinglePost();
  }, [id]);

  return (
    <Root>
      <FadeIn>
        {post.map((post) => (
          <PostContainer key={id}>
            <PostTitle>{post && post.title}</PostTitle>
            <PostInfo>
              <PostDate>
                {post && new Date(post.createdAt).toLocaleString()}
              </PostDate>
              <PostClassify></PostClassify>
            </PostInfo>
            <ArticleContent>{post && post.body}</ArticleContent>
          </PostContainer>
        ))}
      </FadeIn>
    </Root>
  );
}
