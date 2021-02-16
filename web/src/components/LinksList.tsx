import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ILink } from "../interface/link.interface";

interface LinksListProps {
  links: ILink[];
}

export const LinksList: React.FC<LinksListProps> = ({ links }) => {
  if (!links.length) {
    return <p> No links yet</p>;
  }

  return (
    <Table m="auto" w="75%">
      <Thead>
        <Tr>
          <Th> From </Th>
          <Th> To </Th>
          <Th> Created </Th>
        </Tr>
      </Thead>
      <Tbody>
        {links.map((link, index) => {
          return (
            <Tr key={index}>
              <Td>
                <Link to={`/details/${link._id}`}> {link.from} </Link>
              </Td>
              <Td>{link.to} </Td>
              <Td>{new Date(link.created_at).toLocaleDateString()} </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
