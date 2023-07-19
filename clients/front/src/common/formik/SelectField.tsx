import { FieldProps } from 'formik';
import { SelectInput, SelectInputProps, TSelectInputOption } from '../components';

type TProps = FieldProps & SelectInputProps;

export const SelectField = (props: TProps): JSX.Element => {
  const { field, form, onChange, options, ...restProps } = props;

  const error = form.touched[field.name] && form.errors[field.name] ? (form.errors[field.name] as string) : undefined;

  const handleChange = (value?: TSelectInputOption['value']): void => {
    onChange ? onChange(value) : form.setFieldValue(field.name, value);
  };
  const handleBlur = (): void => form.setFieldTouched(field.name, true, true);

  return <SelectInput options={options} error={error} onChange={handleChange} onBlur={handleBlur} {...restProps} />;
};
