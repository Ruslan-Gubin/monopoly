'use client'
import  { ChangeEvent, FormEvent,  useCallback, useState } from 'react';
import { useViewerAction } from '@/entities';
import { IUserLoginValue } from '../../model';
import { checkInputBeforFetch } from '../helpers';


const useViewerLogin = () => {
  const [userValue, setUserValue] = useState<IUserLoginValue>({
    email: { text: "", error: false },
    password: { text: "", error: false },
    name: { text: "", error: false },
  });
  const [viewsPassworld, setViewsPassworld] = useState<boolean>(false);
  const { fetchRegistration, fetchLogin } = useViewerAction()
  const [fotoEmpty, setFotoEmpty] = useState(false)


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

 const errorInput =  checkInputBeforFetch(userValue, setUserValue, type)
 if (errorInput) return;

    if (type === "login") {
      fetchLogin({
        email: userValue.email.text,
        password: userValue.password.text,
      })
    } else {
  if (!imag) {
    setFotoEmpty(true)
    return;
  }
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
    fotoEmpty,
  };
};

export { useViewerLogin };