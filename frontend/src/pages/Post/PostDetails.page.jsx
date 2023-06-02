import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import {Button } from "@mantine/core";
import useBoundStore from "../../store/Store";



import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

const PostDetailsPage = () => {
  const {user } = useBoundStore((state) => state);
  const post = useLoaderData();
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const owner = post.userId === user.id;

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      
        <Grid gutter="md">
          <Grid.Col>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={true} /> */}
            <h1>{post.userName}</h1>
          </Grid.Col>
          <Grid.Col>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={true} /> */}
            <p>{post.title}</p>
          </Grid.Col>
          <Grid.Col >
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <p>{post.category}</p>
          </Grid.Col>
          <Grid.Col >
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} /> */}
            <p>{post.content}</p>
          </Grid.Col>
          
          { owner &&
            <Grid.Col span={2}>
              <Link to={"../edit/"  + post.id.toString()}>
                    <Button variant="white" color="dark">
                      Edit
                    </Button>
              </Link>
            </Grid.Col>
          }
          
          <Grid.Col span={2}>
            <Link to={"/posts"}>
                    <Button variant="white" color="dark">
                      Go to Posts
                    </Button>
              </Link>
          </Grid.Col>
        </Grid>
        <ArticleCardImage key={post.title} image={post.image} individual={true} />
      </SimpleGrid>
    </Container>
  );
}



export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
