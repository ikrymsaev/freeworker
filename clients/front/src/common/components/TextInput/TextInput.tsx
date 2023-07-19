import { ChangeEvent, DetailedHTMLProps } from 'react';
import styles from './TextInput.module.scss';

type THTMLInputProps = Omit<
  DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>;

export type TextInputProps = {
  label: string;
  error?: string;
  onChange: (value: string) => void;
};

export const TextInput = (props: TextInputProps & THTMLInputProps): JSX.Element => {
  const { label, onChange, error, ...restProps } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input onChange={handleChange} {...restProps} />
      <span className={styles.error}>{error ?? ''}</span>
    </div>
  );
};
