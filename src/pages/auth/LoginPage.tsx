import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import InputField from '../../components/InputField';
import { loginSchema } from '../../utils/schema/loginSchema';
import { loginUser } from '../../redux/action/authAction';
import DropdownField from '../../components/DropdownField';
import { useNavigate } from 'react-router-dom';
const initialValues = {
  email: '',
  password: '',
  role: '',
};

const roleOptions = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'patient', label: 'Patient' },
  { value: 'admin', label: 'Admin' },
];
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any, { resetForm }: any) => {
    const loginData = { user: values };
    dispatch(loginUser(loginData));
    navigate(`/landing`);
    resetForm();
  };

  return (
    <div className="form-container">
      <div className="left">
        <div className="header">
          <h1>Welcome Back!</h1>
          <p>Please Login!</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <DropdownField
                label="Role"
                name="role"
                options={roleOptions}
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.role}
                touched={touched.role}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                handleChange={handleChange}
                error={errors.email}
                handleBlur={handleBlur}
                touched={touched.email}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                handleChange={handleChange}
                error={errors.password}
                handleBlur={handleBlur}
                touched={touched.password}
              />

              <button type="submit" className="form-btn ">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="right">
        <img
          src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.webp?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM="
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginPage;
