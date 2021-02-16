import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { UserForm } from "../components/UserForm";
import { config } from "../config/config";

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" marginBottom="3rem">
        Sign Up
      </Heading>
      <UserForm
        url={config.server.api.endpoints.register}
        onSuccessMessage="We've created account for you"
      />
      ;
    </Box>
  );
};
