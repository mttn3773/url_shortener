import {
  useToast,
  useModal,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import { load } from "dotenv/types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useApi } from "../hooks/useApi";
import { IRootState } from "../interface/rootState.interface";

interface NotifyProps {}

export const Notify: React.FC<NotifyProps> = ({}) => {
  const { clearErrors } = useApi();
  const errors = useSelector((state: IRootState) => state.notifyReducer.errors);
  const loading = useSelector(
    (state: IRootState) => state.notifyReducer.loading
  );
  const toast = useToast();
  useEffect(() => {
    if (!errors || !errors.length) return;
    let message: string;
    if (!errors[0]) message = (errors as any).msg || "Something went wrong";
    else message = errors[0].msg || "Something went wrong";
    toast({
      title: "Error",
      description: message || "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    clearErrors();
  }, [errors]);
  return (
    <Modal isOpen={loading} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent background="rgba(0, 0, 0, 0.5)">
        <ModalBody
          display="flex"
          textAlign="center"
          justifyItems="center"
          padding="5rem 5rem"
        >
          <CircularProgress
            isIndeterminate
            margin="auto"
            size="60px"
            color="green.300"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
