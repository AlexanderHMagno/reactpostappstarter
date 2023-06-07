import { TextInput, Button, Group, Box, Container, SimpleGrid, Grid, Text } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate,useLoaderData, Link, Navigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";


function EditPostPage() {
  const navigate = useNavigate();
  const {user } = useBoundStore((state) => state);
  const post = useLoaderData();
  const {userId,id} = post;
  const form = useForm({
    initialValues: {...post},
  });


  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts/edit`, values);
    if (res?.data.success) {
      navigate(`/posts/${id}`);
    }
  };

  //Not allowed 

  if(userId !== user.id) {
    return <Navigate to={`/notAllowed`} />
  }

  return (

    <Container my="md">
    <SimpleGrid cols={2} spacing="sm" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <Grid  align="center" justify="center"  >
      <Box w={350}  >
        <Text mb={50} mt={-30} size={40} component="h2" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} >
          Edit Post
        </Text>{' '}
          <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter a Title"
            {...form.getInputProps("title")}
          />

          <TextInput
            label="Category"
            placeholder="Enter a Category"
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder="Enter an Image"
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Content"
            placeholder="Enter some content"
            {...form.getInputProps("content")}
          />

          <Group position="right" mt="md">
            <Link to={`/posts/${id}`}>
                <Button type="button" color="gray">Back</Button>
            </Link>
          <Button type="submit">Update</Button>
        </Group>
        </form>
        </Box>
      </Grid>

      <Box w={320}> 
        <ArticleCardImage 
          title={form.getInputProps("title").value} 
          image={form.getInputProps("image").value} 
          category={form.getInputProps("category").value} 
          individual={true} />
      </Box>

    </SimpleGrid>
  </Container>

  );
}



export default EditPostPage;
