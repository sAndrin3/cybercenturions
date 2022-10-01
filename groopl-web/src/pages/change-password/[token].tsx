import { Button, Box, IconButton } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/inputField";
import { Wrapper } from "../../components/wrapper";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [show, setShow] = useState(false);
  const handleIconClick = () => setShow(!show);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(ToErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="password"
              placeholder="new password"
              label="New Password"
              required={true}
              isPassword={true}
            />
            <Box mt={8} />
            <InputField
              name="repeatPassword"
              placeholder="repeat password"
              label="Repeat Password"
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
              reset password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
