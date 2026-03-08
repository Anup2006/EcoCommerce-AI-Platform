import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAILogs } from "../redux/aiLogSlice.js";

export default function AILogs() {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(getAILogs());
  }, [dispatch]);

  const totalLogs = logs.length;
  const escalatedLogs = logs.filter((log) => log.status === "Escalated").length;
  const avgConfidence =
    logs.length > 0
      ? Math.round(
          logs.reduce((sum, log) => sum + (log.confidence || 0), 0) / logs.length
        )
      : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">AI Logs Dashboard</h1>
        <p className="text-gray-600 text-sm sm:text-base">Monitor all AI module activities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <p className="text-gray-500 text-xs sm:text-sm">Total AI Requests</p>
          <h2 className="text-xl sm:text-2xl font-semibold">{totalLogs}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <p className="text-gray-500 text-xs sm:text-sm">Escalated Issues</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600">{escalatedLogs}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <p className="text-gray-500 text-xs sm:text-sm">Average Confidence</p>
          <h2 className="text-xl sm:text-2xl font-semibold">{avgConfidence}%</h2>
        </div>
      </div>

      <div className="hidden md:block bg-white shadow rounded-lg p-4 sm:p-6">
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 px-2">Timestamp</th>
                  <th className="px-2">Module</th>
                  <th className="px-2">Action</th>
                  <th className="px-2">Details</th>
                  <th className="px-2">Confidence</th>
                  <th className="px-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b">
                    <td className="py-2 px-2 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="px-2 whitespace-nowrap">{log.module}</td>
                    <td className="px-2 whitespace-nowrap">{log.action}</td>
                    <td className="px-2 max-w-xs truncate">{log.details}</td>
                    <td className="px-2 whitespace-nowrap">{log.confidence}%</td>
                    <td className="px-2">
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

      <div className="md:hidden space-y-4">
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="bg-white shadow rounded-lg p-4">
              <p className="text-gray-500 text-xs">{new Date(log.createdAt).toLocaleString()}</p>
              <p className="font-medium text-gray-900 mt-1">{log.module} - {log.action}</p>
              <p className="text-sm text-gray-700 truncate mt-1">{log.details}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-800">{log.confidence}%</span>
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
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}