interface IFormValues {
  login: string;
  password: string;
}

interface IProps {
  initialValues: IFormValues;
  onSubmit: (values: IFormValues) => void;
}

export type { IProps, IFormValues };
