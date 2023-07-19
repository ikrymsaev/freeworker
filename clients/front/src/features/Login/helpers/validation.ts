import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const schema = z.object({
  login: z
    .string({ required_error: 'Обязательное поле' })
    .min(2, { message: 'Не менее 2 символов' })
    .max(36, { message: 'Не более 36 символов' }),
  password: z
    .string({ required_error: 'Обязательное поле' })
    .min(4, { message: 'Не менее 4 символов' })
    .max(36, { message: 'Не более 36 символов' }),
});

export const validationSchema = toFormikValidationSchema(schema);
