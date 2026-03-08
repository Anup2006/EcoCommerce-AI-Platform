import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAILogs } from "../redux/aiLogSlice.js";

export default function AILogs() {

  const dispatch = useDispatch();

  const { logs, loading } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(getAILogs());
  }, [dispatch]);

  // Dashboard metrics
  const totalLogs = logs.length;

  const escalatedLogs = logs.filter(
    (log) => log.status === "Escalated"
  ).length;

  const avgConfidence =
    logs.length > 0
      ? Math.round(
          logs.reduce((sum, log) => sum + (log.confidence || 0), 0) /
            logs.length
        )
      : 0;

  return (
    <div className="p-6">

      {/* PAGE HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          AI Logs Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor all AI module activities
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Total AI Requests</p>
          <h2 className="text-2xl font-semibold">{totalLogs}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Escalated Issues</p>
          <h2 className="text-2xl font-semibold text-red-600">
            {escalatedLogs}
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Average Confidence</p>
          <h2 className="text-2xl font-semibold">
            {avgConfidence}%
          </h2>
        </div>

      </div>

      {/* LOG TABLE */}

      <div className="bg-white shadow rounded-lg p-6">

        {loading ? (

          <p>Loading logs...</p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Timestamp</th>
                  <th>Module</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Confidence</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {logs.map((log) => (

                  <tr key={log._id} className="border-b">

                    <td className="py-2">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td>{log.module}</td>

                    <td>{log.action}</td>

                    <td className="max-w-xs truncate">
                      {log.details}
                    </td>

                    <td>{log.confidence}%</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          log.status === "Escalated"
                            ? "bg-red-100 text-red-600"
                            : log.status === "Failed"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}