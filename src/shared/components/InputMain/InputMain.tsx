import styles from "./InputMain.module.scss";

interface InputMain {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  type?: string;
  error?: {text: string, status: boolean | undefined};
}

const InputMain = ({ value, onChange, label, type = "string", error }: InputMain) => {
  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor="input-main">
        {!error?.status ? 
        <p>{label}:</p>
        :
        <strong className={styles.error}>{error?.text}</strong>
      }
      </label>
      <input
        id="input-main"
        type={type}
        className={styles.input}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export {InputMain};
