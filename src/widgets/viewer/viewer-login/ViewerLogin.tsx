import { useEffect } from "react";
import { useViewer } from "../../../entities";
import {
  submitButtonText,
  useViewerFeatures,
  useViewerFeaturesAction,
  useViewerLogin,
  VIEWER_ICONS,
} from "../../../features";
import { ButtonRG, InputRG, useAddImage, useRouterNavigation } from "../../../shared";

import styles from "./ViewerLogin.module.scss";

const ViewerLogin = () => {
  const { loginStatus } = useViewerFeatures();
  const { autorization } = useViewer();
  const { navigate } = useRouterNavigation();
  const { loginStatusToggle } = useViewerFeaturesAction();
  const {
    handleChangeEaeViews,
    handleChangeInput,
    userValue,
    validInputs,
    viewsPassworld,
  } = useViewerLogin();
  const { cancelImage, changeFile, fileRef, imag } = useAddImage();

  useEffect(() => {
    if (autorization) {
      navigate('push', '/')
    }
  }, [autorization, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.header__link}>
        <h2 onClick={loginStatusToggle} className={styles.header_link}>
          {loginStatus === "login" ? "Войти" : "Зарегестрироватся"}
        </h2>
      </div>
      <form
        className={styles.form_container}
        onSubmit={(e) => validInputs(e, loginStatus, imag)}
      >
        {loginStatus !== "login" && (
          <>
            {imag.length > 0 ? (
              <picture>
                <img
                  onClick={cancelImage}
                  className={styles.addImage}
                  src={imag}
                  alt=" add Image"
                />
              </picture>
            ) : (
              <picture>
                <img
                  onClick={() => fileRef.current?.click()}
                  className={styles.addImage}
                  src={VIEWER_ICONS.addImage}
                  alt=" add Image"
                />
              </picture>
            )}
            <input ref={fileRef} type="file" onChange={changeFile} hidden />
            <InputRG
              label="Name"
              placeholder="..."
              errorText="Введите от 3 до 30 символов"
              error={userValue.name.error}
              value={userValue.name.text}
              onChange={handleChangeInput}
              name="name"
            />
          </>
        )}

        <InputRG
          label="E-mail"
          placeholder="..."
          errorText="Введите коректный e-mail"
          error={userValue.email.error}
          value={userValue.email.text}
          onChange={handleChangeInput}
          name="email"
          variant="email"
        />
        <InputRG
          label="Password"
          placeholder="..."
          errorText="Введите как минимум 8 символов и минимум 1 цифру"
          error={userValue.password.error}
          passwordEyeClick={handleChangeEaeViews}
          variant="password"
          value={userValue.password.text}
          onChange={handleChangeInput}
          name="password"
          type={viewsPassworld ? "string" : "password"}
        />
        <ButtonRG className={styles.submit_btn} type="submit" color="success">
          {submitButtonText(loginStatus)}
        </ButtonRG>
      </form>
    </div>
  );
};

export { ViewerLogin };
