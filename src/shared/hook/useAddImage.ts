'use client'
import  { useCallback, useRef, useState } from "react"


const useAddImage = () => {
  const [imag, setImage] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  
  const setFileToBase = useCallback((file: File) => {
    try {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () => {

      setImage(String(render.result))

      };

    } catch (error) {
      console.log(error, "Ошибка при загрузке файла!");
    }
  }, []);

  const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : false;
    file && setFileToBase(file);
  },[setFileToBase]);

  const cancelImage = useCallback(() => {
    setImage('')
  }, [])

  const setImageAuth = useCallback((img: string) => {
    setImage(img)
  },[])

  return {fileRef, changeFile, imag, cancelImage, setImageAuth}

}

export {useAddImage}