import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BiDownvote,
  BiUpvote,
  BiComment,
  BiShare,
  BiEdit,
} from "react-icons/bi";
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
        <Link ml="auto">CreatePost</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Flex>
              <Box
                key={p.id}
                shadow={useColorModeValue("md", "lg")}
                borderWidth={"1px"}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                width={"800px"}
              >
                <Flex>
                  <Box
                    textAlign={"center"}
                    alignContent={"start"}
                    p={2}
                    bg={"rgba(0,0,0,0.1)"}
                    fontWeight={"500"}
                  >
                    <BiUpvote
                      size={20}
                      color={useColorModeValue("gray300", "gray100")}
                    />
                    {p.points}
                    <BiDownvote
                      size={20}
                      color={useColorModeValue("gray300", "gray100")}
                    />
                  </Box>
                  <Box m={0} py={4} ml={2}>
                    <Heading fontSize={"xl"}>{p.title}</Heading>
                    <Text mt={4}>{p.textSnippet}...</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
