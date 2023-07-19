import { FieldProps } from 'formik';
import { TextInput, TextInputProps } from '../components/TextInput/TextInput';

type TProps = FieldProps & TextInputProps;

export const TextField = (props: TProps): JSX.Element => {
  const { field, form, onChange, ...restProps } = props;

  const error = form.touched[field.name] && form.errors[field.name] ? (form.errors[field.name] as string) : undefined;

  const handleChange = (value: string): void => {
    onChange ? onChange(value) : form.setFieldValue(field.name, value);
  };
  const handleBlur = (): void => form.setFieldTouched(field.name, true, true);

  return <TextInput error={error} onChange={handleChange} onBlur={handleBlur} {...restProps} />;
};
