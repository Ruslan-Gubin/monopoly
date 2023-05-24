interface ModalFooterText {
  submitText: string;
  cancelText: string;
}

interface ModalRGProps {
  width?: number;
  active: boolean;
  children?: JSX.Element[] | JSX.Element;
  handleClose: () => void;
  title?: string;
  handleCancel?: () => void;
  submitModal?: () => void;
  footer?: ModalFooterText;
}

export type { ModalRGProps };
