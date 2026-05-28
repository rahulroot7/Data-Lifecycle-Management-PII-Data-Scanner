import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getFindings,
} from "../../redux/thunk/findingThunk";
import { useState } from "react";

const Findings = () => {

  const dispatch =
    useDispatch();

  const {
    findings,
  } = useSelector(
    (state) =>
      state.finding
  );

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    dispatch(
      getFindings()
    );

  }, []);

  const filteredFindings =
    findings.filter(
    (item) =>

        item.piiType
        ?.toLowerCase()

        .includes(
            search.toLowerCase()
        )
    );

    const exportCSV =
() => {

  const headers = [

    "PII Type",

    "Database",

    "Table",

    "Field",

    "Sample Value",
  ];

  const rows =
    findings.map(
      (item) => [

        item.piiType,

        item.databaseType,

        item.tableName ||

        item.collectionName,

        item.columnName ||

        item.fieldPath,

        item.sampleValue,
      ]
    );

  let csvContent =
    "data:text/csv;charset=utf-8,";

  csvContent +=
    headers.join(",") +
    "\n";

  rows.forEach(
    (row) => {

      csvContent +=
        row.join(",") +
        "\n";
    }
  );

  const encodedUri =
    encodeURI(
      csvContent
    );

  const link =
    document.createElement(
      "a"
    );

  link.setAttribute(
    "href",
    encodedUri
  );

  link.setAttribute(
    "download",
    "findings.csv"
  );

  document.body.appendChild(
    link
  );

  link.click();
};

  return (

    <DashboardLayout>

      <div
        className="bg-white p-6 rounded-xl shadow"
      >

        <h2
          className="text-2xl font-bold mb-5"
        >

          Findings

        </h2>
        <input
            type="text"
            placeholder="Search PII Type"
            value={search}
            onChange={(e) =>
                setSearch(
                e.target.value
                )
            }
            className="border p-3 rounded-lg mb-5 w-80"
        /> 
        <button
            onClick={exportCSV}
            className="bg-black text-white px-5 py-3 rounded-lg mb-5"
            >Export CSV
        </button>
        <table
          className="w-full"
        >

          <thead>

            <tr
              className="border-b"
            >

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Database
              </th>

              <th className="p-3 text-left">
                Table/Collection
              </th>

              <th className="p-3 text-left">
                Field
              </th>

              <th className="p-3 text-left">
                Sample Value
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredFindings.map(
                (item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {item.piiType}
                    </td>

                    <td className="p-3">
                      {item.databaseType}
                    </td>

                    <td className="p-3">

                      {
                        item.tableName ||

                        item.collectionName
                      }

                    </td>

                    <td className="p-3">

                      {
                        item.columnName ||

                        item.fieldPath
                      }

                    </td>

                    <td className="p-3">
                      {item.sampleValue}
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

export default Findings;