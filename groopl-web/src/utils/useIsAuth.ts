import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

export const UseIsAuth = () => {
  const [isServer, setIsServer] = useState(true);
  const [{ data, fetching }] = useMeQuery({
    pause: isServer,
  });
  const router = useRouter();

  useEffect(() => {
    setIsServer(false);
    if (fetching) {
    } else if (data?.me) {
      console.log("auth: ", data.me);
    } else if (!data?.me) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, fetching]);
};
