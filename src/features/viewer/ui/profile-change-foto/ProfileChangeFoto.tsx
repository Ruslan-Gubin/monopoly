import { useCallback, useRef } from "react";
import { UpdateSvg } from "../../../../shared";
import {  useViewerFeaturesAction } from "../../model";


const ProfileChangeFoto = ({ className }: {className: string}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const { setFoto } = useViewerFeaturesAction()

  const setFileToBase = useCallback((file: File) => {
    try {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () => {
        setFoto(String(render.result))
      };

    } catch (error) {
      console.log(error, "Ошибка при загрузке файла!");
    }
  }, [setFoto]);

  const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : false;
    file && setFileToBase(file);
  },[setFileToBase]);

  return (
    <>
      <UpdateSvg
        onClick={() => fileRef.current?.click()}
        className={className}
      />
      <input ref={fileRef} onChange={changeFile} hidden type="file" />
    </>
  );
};

export { ProfileChangeFoto };
