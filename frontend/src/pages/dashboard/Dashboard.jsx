import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getDashboardStats,
  getDashboardSummary,
} from "../../redux/thunk/dashboardThunk";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,

} from "recharts";

const Dashboard = () => {

  const dispatch =
    useDispatch();

const {

  findings,

  datasources,

  summary,

} = useSelector(
  (state) =>
    state.dashboard
);

  useEffect(() => {

    dispatch(
      getDashboardStats()
    );

    dispatch(
      getDashboardSummary()
    );

  }, []);

  // PII CHART
  const piiCounts = {};

  findings.forEach(
    (item) => {

      piiCounts[
        item.piiType
      ] =

      (
        piiCounts[
          item.piiType
        ] || 0
      ) + 1;
    }
  );

  const chartData =
    Object.keys(
      piiCounts
    ).map((key) => ({

      name: key,

      value:
        piiCounts[key],
    }));

  return (

    <DashboardLayout>

  {/* TOP CARDS */}
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  >

    {/* DATASOURCES */}
    <div
      className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-2xl shadow-lg"
    >

      <p
        className="text-sm opacity-80"
      >

        Total Datasources

      </p>

      <h1
        className="text-5xl font-bold mt-4"
      >

        {
          summary.totalSources || 0
        }

      </h1>

    </div>

    {/* FINDINGS */}
    <div
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg"
    >

      <p
        className="text-sm opacity-80"
      >

        Total Findings

      </p>

      <h1
        className="text-5xl font-bold mt-4"
      >

        {
          summary.totalFindings || 0
        }

      </h1>

    </div>

    {/* CONFIRMED */}
    <div
      className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg"
    >

      <p
        className="text-sm opacity-80"
      >

        Confirmed Findings

      </p>

      <h1
        className="text-5xl font-bold mt-4"
      >

        {
          summary.confirmed || 0
        }

      </h1>

    </div>

    {/* PENDING */}
    <div
      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg"
    >

      <p
        className="text-sm opacity-80"
      >

        Scan's

      </p>

      <h1
        className="text-5xl font-bold mt-4"
      >

        {
          summary.scans || 0
        }

      </h1>

    </div>

  </div>

  {/* CHARTS */}
  <div
    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
  >

    {/* PIE CHART */}
    <div
      className="bg-white rounded-2xl shadow-lg p-6"
    >

      <div
        className="flex justify-between items-center mb-6"
      >

        <h2
          className="text-2xl font-bold"
        >

          PII Distribution

        </h2>

        <span
          className="text-sm text-gray-500"
        >

          Live Analytics

        </span>

      </div>

      <div
        className="h-[400px]"
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              innerRadius={80}
              paddingAngle={5}
              label
            >

              {
                chartData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={[
                        "#000000",
                        "#2563eb",
                        "#16a34a",
                        "#eab308",
                        "#dc2626",
                        "#7c3aed",
                      ][
                        index % 6
                      ]}
                    />
                  )
                )
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

    {/* BAR CHART */}
    <div
      className="bg-white rounded-2xl shadow-lg p-6"
    >

      <div
        className="flex justify-between items-center mb-6"
      >

        <h2
          className="text-2xl font-bold"
        >

          Findings Overview

        </h2>

        <span
          className="text-sm text-gray-500"
        >

          Security Insights

        </span>

      </div>

      <div
        className="h-[400px]"
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>

  {/* RECENT ACTIVITY */}
  <div
    className="bg-white rounded-2xl shadow-lg p-6 mt-8"
  >

    <div
      className="flex justify-between items-center mb-6"
    >

      <h2
        className="text-2xl font-bold"
      >

        Recent Findings

      </h2>

      <button
        className="bg-black text-white px-5 py-2 rounded-lg"
      >

        View All

      </button>

    </div>

    <div
      className="overflow-x-auto"
    >

      <table
        className="w-full"
      >

        <thead>

          <tr
            className="border-b"
          >

            <th className="p-4 text-left">
              PII Type
            </th>

            <th className="p-4 text-left">
              Database
            </th>

            <th className="p-4 text-left">
              Location
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {
            findings
              .slice(0, 5)
              .map(
                (item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {item.piiType}
                    </td>

                    <td className="p-4">
                      {item.databaseType}
                    </td>

                    <td className="p-4">

                      {
                        item.tableName ||

                        item.collectionName
                      }

                    </td>

                    <td className="p-4">

                      <span
                        className={`

                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium

                          ${
                            item.reviewStatus ===
                            "REVIEWED"

                              ? "bg-green-100 text-green-700"

                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >

                        {
                          item.reviewStatus ||

                          "PENDING"
                        }

                      </span>

                    </td>

                  </tr>
                )
              )
          }

        </tbody>

      </table>

    </div>

  </div>

</DashboardLayout>
  );
};

export default Dashboard;