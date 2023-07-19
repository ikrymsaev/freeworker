import { ICity } from '@/app/redux/api/cities/citiesApi.types';
import { Button } from '@/common/components';
import { SelectField } from '@/common/formik/SelectField';
import { TextField } from '@/common/formik/TextField';
import { Form, Field } from 'formik';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCitiesOptions } from '../../helpers/getCitiesOptions';
import styles from './RegistrationForm.module.scss';

interface IProps {
  disabled?: boolean;
  citiesList?: ICity[];
}

export const RegistrationForm: FC<IProps> = (props): JSX.Element => {
  const { disabled, citiesList = [] } = props;
  const { t } = useTranslation('Auth');

  const citiesOptions = useMemo(() => getCitiesOptions(citiesList), [citiesList]);

  return (
    <Form className={styles.form}>
      <Field name="login" label={t('Auth:Field.login')} disabled={disabled} component={TextField} />
      <Field name="first_name" label={t('Auth:Field.first_name')} disabled={disabled} component={TextField} />
      <Field name="last_name" label={t('Auth:Field.last_name')} disabled={disabled} component={TextField} />
      <Field name="email" label={t('Auth:Field.email')} disabled={disabled} component={TextField} />
      <Field name="phone" label={t('Auth:Field.phone')} disabled={disabled} component={TextField} />
      <Field
        name="password"
        label={t('Auth:Field.password')}
        type="password"
        disabled={disabled}
        component={TextField}
      />
      <Field
        name="city_id"
        label={t('Auth:Field.city')}
        type="number"
        disabled={disabled}
        options={citiesOptions}
        component={SelectField}
      />
      <Button variant="primary" type="submit" className={styles.form_button}>
        {t('Auth:Action.register')}
      </Button>
    </Form>
  );
};
