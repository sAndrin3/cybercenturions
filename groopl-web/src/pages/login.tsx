import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useLoginMutation } from "../generated/graphql";
import { ToErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(ToErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              required={true}
            />
            <Box mt={8} />
            <Button
              width="100%"
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(CreateUrqlClient)(Login);
