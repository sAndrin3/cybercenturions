import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { CreateUrqlClient } from "../../utils/createUrqlClient";
import { useGetRideFromUrl } from "../../utils/useGetRideFromUrl";

const Ride: NextPage = ({}) => {
  const [{ data, error, fetching }] = useGetRideFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.ride) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="regular" top>
      <Heading>Ride from {data.ride.from} to {data.ride.to}</Heading>
      <Box mb={4}>Number of Seats {data.ride.seats}</Box>
      {/* <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      /> */}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Ride);
