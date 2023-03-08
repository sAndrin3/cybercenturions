import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Stack,
  Button,
  Box,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useRidesQuery } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

const Offers = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useRidesQuery({
    variables,
  });

  const router = useRouter();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout variant="regular" heading="Ride Offers" top>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.rides.rides.map((r) => (
            <Box
              key={r.id}
              p={5}
              onClick={() => {
                router.push(`/ride/${r.id}`);
              }}
              shadow="md"
              borderWidth="1px"
              borderRadius={"10px"}
              bg={useColorModeValue("gray.200", "gray.700")}
            >
              <Heading fontSize="xl">
                From: {r.from}, To: {r.to}
              </Heading>
              <Box py={4} />
              <Text mt={4}>
                Ride will commence on {dayjs(r.when).toString()}
              </Text>
              <Box py={2} />
              <Text>
                <PlusSquareIcon px={2}></PlusSquareIcon>
                {r.seats} seats
              </Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.rides.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.rides.rides[data.rides.rides.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more rides
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Offers);
