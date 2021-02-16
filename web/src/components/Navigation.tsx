import { Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Router } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { IRootState } from "../interface/rootState.interface";

interface NavigationProps {}
export const Navigation: React.FC<NavigationProps> = ({}) => {
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const { request, dispatchError } = useApi();
  const toast = useToast();
  let links = null;
  const handleLogout = () => {
    request({
      url: "/api/user/logout",
      method: "POST",
      headers: {},
    }).then(
      (res) => {
        toast({
          title: "Success!",
          description: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return window.location.reload();
      },
      (e) => {
        dispatchError(e);
        return window.location.reload();
      }
    );
  };
  if (user) {
    links = (
      <Flex gridGap="3rem" justifyItems="center" mx="auto" color="gray.100">
        <Link to="/create">
          <Text _hover={{ color: "gray.300" }}>CREATE LINK </Text>
        </Link>
        <Link to="#" onClick={handleLogout}>
          <Text _hover={{ color: "gray.300" }}> LOGOUT</Text>
        </Link>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top="0" bgColor="#333" h="60px" alignItems="center">
      <Text color="gray.100" mx="3rem">
        <Link to="/">URL-shortener</Link>
      </Text>
      {links}
    </Flex>
  );
};
