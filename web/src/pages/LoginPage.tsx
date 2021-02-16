import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { UserForm } from "../components/UserForm";
import { config } from "../config/config";
interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" marginBottom="3rem">
        Sign In
      </Heading>
      <UserForm
        url={config.server.api.endpoints.login}
        onSuccessMessage="Logged In Successefully"
      />
      ;
    </Box>
  );
};
