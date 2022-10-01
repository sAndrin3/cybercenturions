import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql";
import { ToErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(ToErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="password"
              placeholder="new password"
              label="Password"
              required={true}
              isPassword={true}
            />
            <Box mt={8} />
            <Button
              width="100%"
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
