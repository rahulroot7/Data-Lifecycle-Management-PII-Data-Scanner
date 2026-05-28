import {
  useEffect,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  createDatasource,
  getDatasources,
} from "../../redux/thunk/datasourceThunk";
import toast from "react-hot-toast";
import { runScan } from "../../redux/thunk/scanThunk";
import socket from "../../socket/socket";

const Datasource = () => {

  const dispatch =
    useDispatch();

const {
  datasources,
} = useSelector(
  (state) =>
    state.datasource
);

const {
  isLoading,
  loadingId,
} = useSelector(
  (state) =>
    state.scan
);

  const [formData,
    setFormData] =
    useState({

      name: "",

      type: "POSTGRES",

      host: "",

      port: "",

      database: "",

      username: "",

      password: "",

      mongoUri: "",
    });

  // GET LIST
  useEffect(() => {

    dispatch(
      getDatasources()
    );

  }, []);

    const [scanMessage, setScanMessage] = useState("");

    useEffect(() => {
    socket.on(

        "scan-progress",

        (data) => {

        setScanMessage(
            data.message
        );
        }
    );

    return () => {

        socket.off(
        "scan-progress"
        );
    };

    }, []);
  // CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const result =
        await dispatch(

          createDatasource(
            formData
          )
        );

      if (
        result.meta
          .requestStatus ===
        "fulfilled"
      ) {

        toast.success(
          "Datasource Created"
        );

        dispatch(
          getDatasources()
        );
      }
    };

    const handleScan =
        async (id) => {

        const result =
            await dispatch(
            runScan(id)
            );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            toast.success(
            "Scan Completed"
            );
        }
    };

  return (

    <DashboardLayout>

      <div
        className="bg-white p-6 rounded-xl shadow"
      >

        <h2
          className="text-2xl font-bold mb-5"
        >

          Datasource

        </h2>

        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }
          className="grid grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Datasource Name"
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <select
            name="type"
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          >

            <option value="POSTGRES">
              POSTGRES
            </option>

            <option value="MONGODB">
              MONGODB
            </option>

          </select>

          {
            formData.type ===
            "POSTGRES"

            &&

            <>

              <input
                type="text"
                name="host"
                placeholder="Host"
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="port"
                placeholder="Port"
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="database"
                placeholder="Database"
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </>
          }

          {
            formData.type ===
            "MONGODB"

            &&

            <input
              type="text"
              name="mongoUri"
              placeholder="Mongo URI"
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg col-span-2"
            />
          }

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg"
          >

            Create Datasource

          </button>

        </form>

      </div>

      {/* TABLE */}
      <div
        className="bg-white p-6 rounded-xl shadow mt-6"
      >

        <h2
          className="text-2xl font-bold mb-5"
        >

          Datasource List

        </h2>
        {
        scanMessage &&

        <div
            className="bg-black text-white p-3 rounded-lg mb-5"
        >

            {scanMessage}

        </div>
        }   
        <table
          className="w-full"
        >

          <thead>

            <tr
              className="border-b"
            >

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Status
              </th>
              <th className="p-3 text-left">
                Action
            </th>

            </tr>

          </thead>

          <tbody>

            {
              datasources.map(
                (item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {item.name}
                    </td>

                    <td className="p-3">
                      {item.type}
                    </td>

                    <td className="p-3">
                      {item.status}
                    </td>
                    <td className="p-3">

                        <button
                          onClick={() =>
                            handleScan(
                              item._id
                            )
                          }

                          disabled={
                            isLoading &&
                            loadingId ===
                            item._id
                          }

                          className={`

                            px-4
                            py-2
                            rounded-lg
                            text-white
                            flex
                            items-center
                            gap-2

                            ${
                              isLoading &&
                              loadingId ===
                              item._id

                                ? "bg-gray-500 cursor-not-allowed"

                                : "bg-black"
                            }
                          `}
                        >

                          {
                            isLoading &&
                            loadingId ===
                            item._id

                              ? (

                                <>

                                  <div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                  />

                                  Scanning...

                                </>

                              )

                              : "Run Scan"
                          }

                        </button>

                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default Datasource;