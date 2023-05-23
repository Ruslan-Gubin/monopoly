import  { ChangeEvent, FormEvent,  useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared';
import { IUserLoginValue, useViewerFeaturesAction } from '../../model';
import { checkInputBeforFetch } from '../helpers';


const useViewerLogin = () => {
  const [userValue, setUserValue] = useState<IUserLoginValue>({
    email: { text: "gubin_ruslan@ramble.ru", error: false },
    password: { text: "1234qwer", error: false },
    name: { text: "Ruslan", error: false },
  });
  const [viewsPassworld, setViewsPassworld] = useState<boolean>(false);
  const { fetchRegistration, fetchLogin } = useViewerFeaturesAction()
  const dispatch = useAppDispatch();


  const handleChangeEaeViews = useCallback(() => {
    setViewsPassworld((prev) => !prev);
  }, []);

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const unputName = e.target.id;
      setUserValue((prev) => ({
        ...prev,
        [unputName]: { ...prev.email, text: e.target.value },
      }));
    },
    []
  );

  const validInputs = useCallback((e: FormEvent<HTMLFormElement>, type: string , imag: string) => {
    e.preventDefault();

 const errorInput =  checkInputBeforFetch(userValue, setUserValue)
 if (errorInput) return;

    if (type === "login") {
      fetchLogin({
        email: userValue.email.text,
        password: userValue.password.text,
      })
    } else {
      fetchRegistration({
        email: userValue.email.text,
        password: userValue.password.text,
        fullName: userValue.name.text,
        imag,
      })
    }
    
  }, [userValue,  fetchLogin, fetchRegistration]);

  return {
    handleChangeInput,
    validInputs,
    viewsPassworld,
    handleChangeEaeViews,
    userValue,
  };
};

export { useViewerLogin };