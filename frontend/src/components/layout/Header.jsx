import {
  useDispatch,
} from "react-redux";

import {
  logoutAdmin,
} from "../../redux/thunk/authThunk";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  useSelector,
} from "react-redux";

import {
  getHealthStatus,
} from "../../redux/thunk/healthThunk";

const Header = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

      await dispatch(
        logoutAdmin()
      );

      navigate("/");
    };

    const {
      server,
    } = useSelector(
      (state) =>
        state.health
    );

    useEffect(() => {

      dispatch(
        getHealthStatus()
      );

    }, []);

  return (

    <div
      className="bg-white shadow p-5 flex justify-between items-center"
    >

      <h2
        className="text-2xl font-bold"
      >

        Dashboard

      </h2>

      <div
        className="flex items-center gap-4"
      >

        {/* HEALTH */}
        <div
          className={`

            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold

            ${
              server === "UP"

                ? "bg-green-100 text-green-700"

                : "bg-red-100 text-red-700"
            }
          `}
        >

          <div
            className={`

              w-2
              h-2
              rounded-full

              ${
                server === "UP"

                  ? "bg-green-600"

                  : "bg-red-600"
              }
            `}
          />

          {
            server === "UP"

              ? "Server Healthy"

              : "Server Down"
          }

        </div>

        {/* LOGOUT */}
        <button
          onClick={
            handleLogout
          }
          className="bg-black text-white px-4 py-2 rounded-lg"
        >

          Logout

        </button>

      </div>

    </div>
  );
};

export default Header;