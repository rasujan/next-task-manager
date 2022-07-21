import React from "react";
import { Modal, Button } from "@mantine/core";

type propsType = {
  opened: boolean;
  onClose: () => void;
  onConfirm: (any) => any;
  title?: string;
  subtitle?: string;
  loading?: boolean;
};

const ConfirmationModal = (props: propsType) => {
  const { opened, onClose, loading, title, subtitle, onConfirm } = props;

  return (
    <>
      <Modal centered opened={opened} onClose={onClose} title="Confirmation">
        <h2> {title || "Are your sure?"}</h2>
        <span> {subtitle || "You are about to detele the task."} </span>

        <div className="flex gap-1 mt-4">
          <Button
            type="button"
            radius="sm"
            variant="outline"
            fullWidth
            uppercase
            onClick={onConfirm}
            {...{ loading }}
          >
            Ok
          </Button>

          <Button
            type="button"
            onClick={onClose}
            radius="sm"
            variant="outline"
            fullWidth
            uppercase
            color="gray"
          >
            Cacel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
