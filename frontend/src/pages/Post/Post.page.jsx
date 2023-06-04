import React from "react";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage, CardSkeleton } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, defer, Await } from "react-router-dom";


export const PostPage = () => {
  const data = useLoaderData();
  

  return (
    <Container>
      <SimpleGrid cols={3}>

      <React.Suspense
        fallback={<><CardSkeleton/><CardSkeleton/></>}
      >
        <Await
          resolve={data.posts}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(posts) => (
              posts.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))
          )}
        </Await>
      </React.Suspense>


      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  
  return defer ({
    posts:  axios.get(`${DOMAIN}/api/posts`).then(res => res.data)
    
  })
  
};
