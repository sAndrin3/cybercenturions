import { withUrqlClient } from "next-urql";
import NavBar from "../components/NavBar/navBar";
import { usePostsQuery } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <NavBar />
      <div>Hello World</div>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </div>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
