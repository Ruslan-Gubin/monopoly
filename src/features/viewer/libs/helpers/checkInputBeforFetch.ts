import { Dispatch, SetStateAction } from "react";
import { IUserLoginValue } from "../../model";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "./validateInputs";


export const checkInputBeforFetch = (
  userValue: IUserLoginValue,
  setUserValue: Dispatch<SetStateAction<IUserLoginValue>>,
  type: string,
) => {
 
  const checkEmail = validateEmail(userValue.email.text);
  const checkPassword = validatePassword(userValue.password.text);
  let checkName = validateName(userValue.name.text);

  if (type === 'login') {
    checkName = 'true';
  }

  const checkInputs = [
    { input: "email", check: checkEmail },
    { input: "password", check: checkPassword },
    { input: "name", check: checkName },
  ];

  checkInputs.forEach((item) => {
    const input = item.input;

    if (!item.check) {
      setUserValue((prev) => ({
        ...prev,
        [input]: { ...prev[input], error: true },
      }));
    } else {
      setUserValue((prev) => ({
        ...prev,
        [input]: { ...prev[input], error: false },
      }));
    }
  });

  const validInputError = checkInputs.find((item) => !item.check);
  
  return !!validInputError
};
