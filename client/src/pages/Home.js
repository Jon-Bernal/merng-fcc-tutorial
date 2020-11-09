import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts = [];
  if (data) {
    posts = data?.getPosts;
  }

  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row id="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h2>Loading Posts...</h2>
          ) : (
            posts &&
            posts.map((post) => {
              return (
                <Grid.Column
                  key={post.id}
                  style={{ color: "white", marginBottom: "20px" }}
                >
                  <PostCard post={post} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;

const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
