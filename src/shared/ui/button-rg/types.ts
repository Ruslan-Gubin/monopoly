type ColorType =
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | "info"
  | "light"
  | "dark"
  | "success";

interface ButtonRGProps {
  type?: "button" | "reset" | "submit";
  className?: string;
  color?: ColorType;
  children: string;
  size?: "sm" | "md" | "lg";
  id?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export type { ButtonRGProps };
