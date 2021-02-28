import styled from "styled-components";
import { Loading, SmallPostInfoCard } from "../../components";
import { deletePost, getPosts } from "../../utils/WebAPI";
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

SmallPostInfoCard.propTypes = {
  post: PropTypes.object,
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then((posts) => setPosts(posts))
      .then(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  const handleDeletePost = (id) => {
    deletePost(id)
      .then(() => {
        getPosts().then((posts) => setPosts(posts));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(setIsLoading(false));
  };

  return (
    <Root>
      <FadeIn>
        {isLoading && <Loading />}
        {posts.map((post) => (
          <SmallPostInfoCard
            post={post}
            key={post.id}
            handleDeletePost={handleDeletePost}
          ></SmallPostInfoCard>
        ))}
      </FadeIn>
    </Root>
  );
}
