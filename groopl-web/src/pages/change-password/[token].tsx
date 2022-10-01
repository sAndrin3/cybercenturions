import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/inputField";
import { Wrapper } from "../../components/wrapper";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "", repeatPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.newPassword !== values.repeatPassword) {
            setErrors({
              repeatPassword: "these passwords do not match",
            });
          }
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
              name="newPassword"
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
