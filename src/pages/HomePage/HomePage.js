import styled from "styled-components";
import { Loading, PostInfoCard } from "../../components";
import { getPosts } from "../../utils/WebAPI";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import FadeIn from "react-fade-in";
import { LoadingContext } from "../../utils/contexts";

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  margin: auto;
  border-radius: 5px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

PostInfoCard.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    getPosts(5)
      .then((posts) => {
        setPosts(posts);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <Root>
      <FadeIn>
        {isLoading && <Loading />}
        {posts.map((post) => (
          <PostInfoCard post={post} key={post.id} />
        ))}
      </FadeIn>
    </Root>
  );
}
