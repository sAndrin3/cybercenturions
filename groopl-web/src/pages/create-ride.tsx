import { Stack, Button, Box } from "@chakra-ui/react";
import { DatePickerInput } from "chakra-datetime-picker";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import { useCreateRideMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, createRide] = useCreateRideMutation();
  const router = useRouter();

  return (
    <Layout
      variant="small"
      heading="Create a Ride"
      text="set up a ride"
      form
      top
    >
      <Formik
        enableReinitialize
        initialValues={{
          to: "",
          from: "",
          when: dayjs().toDate().toISOString(),
          seats: 0,
        }}
        onSubmit={async (values) => {
          const { error } = await createRide({
            input: {
              to: values.to,
              from: values.from,
              when: values.when,
              seats: parseFloat(values.seats),
            },
          });
          console.log(error);
          if (!error) {
            router.push("/rides");
          }
        }}
      >
        {({ isSubmitting, initialValues, setFieldValue }) => (
          <Form>
            <InputField
              name="from"
              placeholder="Kutus"
              label="Pick-up point"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="to"
              placeholder="Kerugoya"
              label="Destination"
              required={true}
            />
            <Box mt={4} />
            <DatePickerInput
              name="when"
              placeholder="DD-MM-YYYY 00:00:00"
              showTimeSelector
              showOkButton
              showSelectableDays
              okText="Done"
              onOk={(e) => {
                setFieldValue("when", e.toDate().toISOString());
                console.log(initialValues);
              }}
              size="lg"
              format="DD-MM-YYYY HH:mm:ss"
              currentLangKey="en"
            />
            <InputField
              name="seats"
              placeholder="5"
              label="no. of seats"
              required={true}
            />

            <Box mt={8} />
            <Stack>
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
                Create Ride
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
