import React, { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, FormControl, FormLabel, ModalBody, ModalFooter, Select } from "@chakra-ui/react";

import CustomModal from "./ui/CustomModal";
import { ModalContext } from "../context/ContextProvider";
import { useUpdateOrderPaymentStatusMutation } from "../services/bakeryApi";

const options = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Paid",
    value: "Paid",
  },
];

const OrderModal = ({ status, setPaymentStatus }) => {
  const initialRef = useRef(null);
  const productId = useSelector((state) => state.ids._id);
  const id = productId?.payload;
  const { onClose } = useContext(ModalContext);
  const [updatePaymentStatus, { isLoading, isSuccess }] = useUpdateOrderPaymentStatusMutation();

  const handleClose = () => {
    onClose();
  };

  const onUpdate = async () => {
    const res = await updatePaymentStatus({ id, paymentStatus: status });

    onClose();
  };

  return (
    <CustomModal heading="Update Order" handleClose={handleClose}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="normal">
            Payment Status
          </FormLabel>
          <Select
            ref={initialRef}
            fontSize="sm"
            defaultValue={status}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={onUpdate}
          colorScheme="blue"
          mr={3}
          style={{
            background: "black",
          }}
          size="md"
          loadingText="Updating..."
          isLoading={isLoading}
        >
          Update
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default OrderModal;
