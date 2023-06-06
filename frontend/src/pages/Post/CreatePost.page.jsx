import { TextInput, Button, Group, Box, Text, Container, SimpleGrid, Grid } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";

function CreatePostPage() {
  const {user } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
      userId: user.id
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts`, values);
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="sm" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Grid  align="center" justify="center"  >
        <Box w={350}  >
          <Text mb={50} mt={-30} size={40} component="h2" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} >
            Create Post
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
              <Button type="submit">Submit</Button>
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

export default CreatePostPage;
