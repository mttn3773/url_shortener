import { Button, Flex, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { InputField } from "../components/InputField";
import { useApi } from "../hooks/useApi";

interface CreateLinkPageProps {}

export const CreateLinkPage: React.FC<CreateLinkPageProps> = ({}) => {
  const { request, dispatchError } = useApi();
  const [success, setSuccess] = useState<boolean>(false);
  const toast = useToast();
  if (success) return <Redirect to="/" />;
  return (
    <Formik
      initialValues={{ to: "" }}
      onSubmit={async (values) => {
        const res = await request({
          url: "https://url-shortener0013.herokuapp.com/api/link/generate",
          method: "POST",
          headers: {},
          body: values,
        });
        if (res.errors) return dispatchError(res.errros);
        toast({
          title: "Success!",
          description: "Link added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return setSuccess(true);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex
            w="50%"
            mx="auto"
            my="4rem"
            direction="column"
            gridGap="3rem"
            alignItems="center"
          >
            <InputField type="to" name="to" withLabel={false} />
            <Button
              w="10%"
              colorScheme="blue"
              type="submit"
              disabled={isSubmitting}
            >
              ADD
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
