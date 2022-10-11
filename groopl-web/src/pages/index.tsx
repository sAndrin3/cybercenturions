import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import {
  Box,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout variant="regular" top>
      <NextLink href={"/create-post"}>
        <Link>CreatePost</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box
              key={p.id}
              p={4}
              shadow={useColorModeValue("md", "lg")}
              borderWidth={"1px"}
              borderColor={useColorModeValue("gray.300", "gray.600")}
            >
              <Heading fontSize={"xl"}>{p.title}</Heading>
              <Text mt={4}>{p.text}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
