import React, { FC, memo } from "react";
import { SearchIcon } from "./components/SearchIcon/SearchIcon";
import { PhoneImage } from "./components/PhoneIcon/PhoneIcon";
import { InputProps } from "./types";
import { topIconContainer } from "./helpers";
import { EaySvg } from "./components/EyeSvg/EyeSvg";

import "./InputRG.css";


const InputRG: FC<InputProps> = memo(
  ({
    className,
    value,
    searchClick,
    passwordEyeClick,
    variant,
    error,
    errorText,
    name,
    sizeInput = "md",
    placeholder,
    label,
    type = "text",
    ...props
  }) => {
    const classes = [`inputrg-input inputrg-size__${sizeInput}`];

    if (sizeInput) {
      classes.push(`inputrg-input__${sizeInput}`);
    }

    if (error) {
      classes.push("inputrg-error__input");
    }

    if (className) {
      classes.push(className);
    }

    const variants = {
      search: <SearchIcon onClick={searchClick} />,
      email: <span>@</span>,
      phone: <PhoneImage />,
      password: <EaySvg handleClick={passwordEyeClick && passwordEyeClick} />
    };

    return (
      <label htmlFor={name} className="inputrg-label">
        {label}
        <input
          value={value}
          type={type}
          id={name}
          className={classes.join(" ")}
          placeholder={placeholder}
          {...props}
        />
        <div
          style={{ top: topIconContainer(label, sizeInput) }}
          className="inputrg-icon__container"
        >
          {variant && sizeInput !== "sm" && variants[variant]}
        </div>
        {errorText && <p className="inputrg-error">{error && errorText}</p>}
      </label>
    );
  }
);

InputRG.displayName = 'InputRG';

export { InputRG };
