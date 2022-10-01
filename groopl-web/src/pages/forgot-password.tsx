import { Stack, Button, Box, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Wrapper
      variant="small"
      heading="Forgot your password?"
      text={
        complete
          ? "check your email"
          : "you'll get an email with the reset link"
      }
    >
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Text fontSize={"lg"} fontStyle={'oblique'} color={'black'}>
                if an account with that email exists
                <br/>
                We just sent You an email with the reset link.
            </Text>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="your-email@example.com"
                label="Email"
                required={true}
              />
              <Box mt={4} />
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Request Reset
                </Button>
              </Stack>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(CreateUrqlClient)(ForgotPassword);
