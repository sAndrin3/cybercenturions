import { withUrqlClient } from "next-urql";
import { useRidesQuery } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

const Offers = () => {
  const {} = useRidesQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
  
  })
  return (
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Offers);
