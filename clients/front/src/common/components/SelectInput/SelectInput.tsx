import { ChangeEvent, DetailedHTMLProps } from 'react';
import styles from './SelectInput.module.scss';

type THTMLSelectProps = Omit<
  DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'onChange'
>;
export type TOptionValue = string | number | readonly string[];
export type TSelectInputOption = {
  id: string;
  label: string;
  value: TOptionValue;
};
export type SelectInputProps = {
  label?: string;
  options: TSelectInputOption[];
  error?: string;
  onChange: (value?: TSelectInputOption['value']) => void;
};

export const SelectInput = (props: SelectInputProps & THTMLSelectProps): JSX.Element => {
  const { label, options, onChange, error, ...restProps } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;
    onChange(options.find((o) => o.id === value)?.value);
  };

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select onChange={handleChange} {...restProps}>
        {options?.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.error}>{error ?? ''}</span>
    </div>
  );
};
