import {
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  registerAdmin,
} from "../../redux/thunk/authThunk";

import {
  useNavigate,
} from "react-router-dom";

const Register = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: "",
    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const result =
        await dispatch(

          registerAdmin(
            formData
          )
        );

      if (
        result.meta
          .requestStatus ===
        "fulfilled"
      ) {

        navigate("/");
      }
    };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >

      <div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h2
          className="text-3xl font-bold text-center mb-6"
        >

          Register

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >

            Register

          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;