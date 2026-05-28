import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  loginAdmin,
} from "../../redux/thunk/authThunk";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import toast from "react-hot-toast";

import * as Yup
from "yup";

const Login = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    isLoading,
  } = useSelector(
    (state) =>
      state.auth
  );

  // VALIDATION
  const validationSchema =
    Yup.object({

      email:
        Yup.string()

          .email(
            "Invalid email"
          )

          .required(
            "Email is required"
          ),

      password:
        Yup.string()

          .required(
            "Password is required"
          )

          .min(
            6,
            "Minimum 6 characters"
          ),
    });

  // SUBMIT
  const handleSubmit =
    async (values) => {

    const result =
        await dispatch(
        loginAdmin(values)
        );

    if (
        result.meta.requestStatus ===
        "fulfilled"
    ) {

        toast.success(
        "Login Success"
        );

        navigate(
        "/dashboard"
        );

    } else {

        toast.error(
        result.payload.message
        );
    }
    };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >

      <div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h2
          className="text-3xl font-bold text-center mb-6"
        >

          Login

        </h2>

        <Formik

          initialValues={{

            email: "",

            password: "",
          }}

          validationSchema={
            validationSchema
          }

          onSubmit={
            handleSubmit
          }
        >

          {() => (

            <Form
              className="space-y-4"
            >

              {/* EMAIL */}
              <div>

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full border p-3 rounded-lg outline-none"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full border p-3 rounded-lg outline-none"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-lg"
              >

                {
                  isLoading
                    ? "Loading..."
                    : "Login"
                }

              </button>

              {/* REGISTER */}
              <p
                className="text-center text-sm"
              >

                Don't have account?

                <Link
                  to="/register"
                  className="ml-2 text-blue-600"
                >

                  Register

                </Link>

              </p>

            </Form>
          )}

        </Formik>

      </div>

    </div>
  );
};

export default Login;