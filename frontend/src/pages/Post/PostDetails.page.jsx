import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";

import useBoundStore from "../../store/Store";
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem, createStyles, Button,  Text, Title  } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.colorScheme,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },

  category: {
    color: theme.colorScheme,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: theme.spacing.lg
  },

  content: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: theme.spacing.lg,
    fontSize: rem(130)
  },
}));






const PRIMARY_COL_HEIGHT = rem(300);

const PostDetailsPage = () => {
  const { classes, theme } = useStyles();
  const {user } = useBoundStore((state) => state);
  const post = useLoaderData();
  const owner = post.userId === user.id;

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="sm" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      
        <Grid gutter="md" mr={10}>
          <Grid.Col>
            <Title order={3} className={classes.title}>
              @{post.userName}
            </Title>

            <Text className={classes.category} size="m">
              {post.title} - {post.category}
           </Text>
            <Text fw={300} fz="lg" mt={50} className={classes.content}>
              {post.content}
            </Text>
          </Grid.Col>
          
          { owner &&
            <Grid.Col span={2} >
              <Link to={"../posts/edit/"  + post.id.toString()}>
                    <Button  color="dark">
                      Edit
                    </Button>
              </Link>
            </Grid.Col>
          }
          
          <Grid.Col span={2}>
            <Link to={"/posts"}>
                    <Button variant="filled" color="cyan">
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
