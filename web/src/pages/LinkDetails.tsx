import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { ILink } from "../interface/link.interface";
interface LinkDetailsProps {}

export const LinkDetails: React.FC<LinkDetailsProps> = ({}) => {
  const linkId = useParams<{ id: string }>().id;
  const { request, dispatchError } = useApi();
  const [link, setLink] = useState<ILink>();
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const handleDelete = async (id: ILink["_id"]) => {
    const res = await request({
      url: `/api/link/${id}`,
      method: "DELETE",
      headers: {},
    });
    if (!res.errors) {
      setOnDelete(true);
    }
  };
  useEffect(() => {
    if (!linkId) {
      return;
    }
    request({
      url: `/api/link/${linkId}`,
      method: "GET",
      headers: {},
    }).then(
      (res) => setLink(res.link),
      (e) => dispatchError(e)
    );
  }, [linkId]);
  if (onDelete) return <Redirect to="/" />;
  if (!link) return <Text>Loading...</Text>;
  return (
    <Flex
      direction="column"
      mx="auto"
      w="50%"
      my="5rem"
      alignItems="center"
      gridGap="2rem"
    >
      <Text as="b">
        From:{" "}
        <a href={link.from} target="_blank">
          {link.from}
        </a>
      </Text>

      <Text> To: {link.to}</Text>
      <Text>Created At: {new Date(link.created_at).toLocaleDateString()}</Text>
      <Text> Clicks: {link.clicks}</Text>
      <a href={link.from}>Re</a>
      <Text as="a" onClick={() => handleDelete(link._id)}>
        Delete
      </Text>
    </Flex>
  );
};
