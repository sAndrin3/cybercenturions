import { Stack, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";

interface createPostProps {}

const CreatePost: React.FC<createPostProps> = ({}) => {
  return (
    <Layout
      variant="regular"
      heading="Create Post"
      text="write something interesting"
    >
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Title"
              label="Title"
              style={{
                fontWeight: "bold",
              }}
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="text"
              placeholder="Text..."
              label="Text"
              required={true}
              textarea
            />
            <Box mt={8} />
            <Stack spacing={5}>
              <Button
                isLoading={isSubmitting}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Create Post
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
