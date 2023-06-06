import { TextInput, Button, Group, Box, Container } from "@mantine/core";
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
    <Box maw={300}  mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container my="md"    >
            <div>
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
            </div>
            {/* <ArticleCardImage image={form.getInputProps("image")} individual={true} /> */}
        </Container>

        

        <Group position="right" mt="md">
            <Link to={`/posts/${id}`}>
                <Button type="button" color="gray">Back</Button>
            </Link>
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}


export const postDetailsLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return res.data;
  };
  

export default EditPostPage;
