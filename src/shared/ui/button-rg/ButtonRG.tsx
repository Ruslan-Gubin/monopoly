import React, { FC } from "react";
import "./ButtonRG.css";
import { ButtonRGProps } from "./types";

const ButtonRG: FC<ButtonRGProps> = ({
  disabled,
  size = "normal",
  id,
  children,
  color = "primary",
  className,
  type = "button",
  handleClick,
  ...props
}) => {
  const rootClasses = ["button-main", `color-${color}`];

  if (size) {
    rootClasses.push(`size-${size}`);
  }

  if (className) {
    rootClasses.push(className);
  }

  if (disabled) {
    rootClasses.push('disabled')
  }

  return (
    <button
      {...props}
      disabled={disabled}
      id={id}
      onClick={disabled ? () => {} : handleClick}
      type={type}
      className={rootClasses.join(" ")}
      >
      {children}
    </button>
  );
};

export { ButtonRG };
