import DashboardLayout from "../../layouts/DashboardLayout";

const ScanHistory = () => {

  return (

    <DashboardLayout>

      <div
        className="bg-white p-6 rounded-xl shadow"
      >

        <h2
          className="text-2xl font-bold mb-5"
        >

          Scan History

        </h2>

        <table
          className="w-full"
        >

          <thead>

            <tr
              className="border-b"
            >

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Findings
              </th>

              <th className="p-3">
                Started
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="p-3">
                COMPLETED
              </td>

              <td className="p-3">
                15
              </td>

              <td className="p-3">
                24 May
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default ScanHistory;