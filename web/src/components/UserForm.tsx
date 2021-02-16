import {
  Box,
  Button,
  CircularProgress,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { IRootState } from "../interface/rootState.interface";
import { setUser } from "../store/actions/auth.actions";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";

interface UserFormProps {
  url: string;
  onSuccessMessage: string;
}
export const UserForm: React.FC<UserFormProps> = ({
  url,
  onSuccessMessage,
}) => {
  const { request } = useApi();
  const [success, setSuccess] = useState<boolean>();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: IRootState) => state.notifyReducer);
  const toast = useToast();
  if (success) {
    return <Redirect to="/" exact />;
  }
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const res = await request({
            url,
            method: "POST",
            body: values,
            headers: {},
          });
          if (res.errors) {
            const mappedErrors = toErrorMap({ errors: res.errors });
            setErrors(mappedErrors);
            return;
          }
          if (res.user) {
            dispatch(setUser({ user: res.user }));
            toast({
              title: "Success!",
              description: onSuccessMessage,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            return setSuccess(true);
          }
          return;
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Flex
              w="50%"
              m="auto"
              border={`2px solid ${
                errors.email || errors.password ? "tomato" : "green"
              }`}
              borderRadius="5px"
              padding="2rem 3rem"
              justifyItems="center"
              direction="column"
            >
              <Box w="65%" m="auto" mb="2rem">
                <InputField type="email" name="email" />
              </Box>
              <Box w="65%" m="auto" mb="2rem">
                <InputField type="password" name="password" />
              </Box>
              <Button
                _hover={{
                  color: "black",
                  background: "tomato",
                  transition: "0.4s ease-in-out",
                }}
                transition="0.4s ease-in-out"
                type="submit"
                margin="auto"
                colorScheme="blue"
                minW="5rem"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? (
                  <CircularProgress
                    isIndeterminate
                    size="20px"
                    color="green.300"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};
