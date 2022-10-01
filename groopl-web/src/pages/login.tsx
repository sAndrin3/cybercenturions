import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useLoginMutation } from "../generated/graphql";
import { ToErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper
      variant="small"
      heading="Sign in to your account"
      text="to enjoy all of our cool features 🤟"
    >
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
              required={true}
              isPassword={true}
            />
            <Stack spacing={5}>
              <Stack pt={4} align="end">
                <NextLink href={"/forgot-password"}>
                  <Link color={"blue.400"}>Forgot Password?</Link>
                </NextLink>
              </Stack>
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
                login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <NextLink href={"/register"}>
                  <Link color={"blue.400"}>Create one</Link>
                </NextLink>
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(CreateUrqlClient)(Login);
