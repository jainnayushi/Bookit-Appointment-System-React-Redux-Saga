import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^\S+@\S+\.\S+$/, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  role: Yup.string().required('Role is required'),
});
