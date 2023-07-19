import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

/** Модель формы регистрации. */
export type TRegisterFormValues = {
  login: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city_id: number;
  password: string;
};

const validationSchema = z.object({
  login: z.string({ required_error: 'Обязательное поле' }).min(2, { message: 'Минимум 6 символов' }).max(36),
  first_name: z.string({ required_error: 'Обязательное поле' }).min(2, { message: 'Минимум 2 символа' }).max(36),
  last_name: z
    .string({ required_error: 'Обязательное поле' })
    .min(2, { message: 'Минимум 2 символа' })
    .max(36)
    .optional(),
  email: z.string({ required_error: 'Обязательное поле' }).email({ message: 'Некорректный емайл' }).optional(),
  phone: z.string().min(10).max(13).optional(),
  city_id: z.number().int(),
  password: z.string().min(6, { message: 'Минимум 6 символов' }).max(20, { message: 'Максимум 20 символов' }),
});

export const registerFormSchema = toFormikValidationSchema(validationSchema);
