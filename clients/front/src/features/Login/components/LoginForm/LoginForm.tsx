import { Button } from '@/common/components';
import { TextField } from '@/common/formik/TextField';
import { Form, Field, useFormikContext } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginForm.module.scss';

interface IProps {
  disabled?: boolean;
}

export const LoginForm: FC<IProps> = (props): JSX.Element => {
  const { disabled } = props;
  const { t } = useTranslation('Auth');

  const { handleSubmit } = useFormikContext();

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Field name="login" label={t('Auth:Field.login')} disabled={disabled} component={TextField} />
      <Field
        name="password"
        label={t('Auth:Field.password')}
        type="password"
        disabled={disabled}
        component={TextField}
      />
      <Button type="submit" variant="primary" disabled={disabled} className={styles.form_button}>
        {t('Auth:Action.login')}
      </Button>
    </Form>
  );
};
