import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditLogs } from "./logSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";

function Logs() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { logs, loading, error, pagination } = useSelector(
    (state) => state.logs,
  );

  useEffect(() => {
    dispatch(fetchAuditLogs({ page: currentPage, limit: pagination.limit }));
  }, [dispatch, currentPage, pagination.limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Audit Logs
        </h1>
        <button
          onClick={() =>
            dispatch(
              fetchAuditLogs({ page: currentPage, limit: pagination.limit }),
            )
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
        >
          Refresh
        </button>
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow p-4 border border-gray-100 overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table
            className="min-w-[600px] w-full text-sm divide-y divide-gray-200"
            aria-label="Audit log table"
          >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Timestamp
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Action
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  User
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Target
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      {log.createdAt
                        ? new Date(log.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap font-semibold text-indigo-700">
                      {log.action || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {log.user ? (
                        <span className="font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                          {log.user.id}
                        </span>
                      ) : (
                        "-"
                      )}{" "}
                      <span className="ml-2 text-xs text-gray-500">
                        {log.user?.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {log.target ? (
                        <span className="font-mono text-green-800 bg-green-50 px-2 py-0.5 rounded">
                          {log.target.type}: {log.target.id}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {log.details && log.details.deletedUserEmail ? (
                        <span className="font-mono text-red-800 bg-red-50 px-2 py-0.5 rounded">
                          {log.details.deletedUserEmail}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-6">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="sm:hidden">
        <div className="max-h-[520px] overflow-y-auto space-y-4 pr-1">
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log._id}
                className="bg-white rounded-xl shadow p-4 border border-gray-100 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "-"}
                  </span>
                  <span className="font-semibold text-indigo-700">
                    {log.action || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">User:</span>{" "}
                    {log.user ? (
                      <span className="font-mono text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">
                        {log.user.id}
                      </span>
                    ) : (
                      "-"
                    )}{" "}
                    <span className="ml-1 text-xs text-gray-500">
                      {log.user?.role}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Target:</span>{" "}
                    {log.target ? (
                      <span className="font-mono text-green-800 bg-green-50 px-1.5 py-0.5 rounded">
                        {log.target.type}: {log.target.id}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Details:</span>{" "}
                    {log.details && log.details.deletedUserEmail ? (
                      <span className="font-mono text-red-800 bg-red-50 px-1.5 py-0.5 rounded">
                        {log.details.deletedUserEmail}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-6">No logs found.</div>
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      {pagination && (
        <div className="flex flex-col items-center justify-center mt-8 gap-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center px-4">
              <span className="text-sm text-gray-600">
                Page{" "}
                <span className="font-semibold text-gray-900">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {pagination.totalPages}
                </span>
              </span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || loading}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Showing {logs.length} of {pagination.totalLogs} total entries
          </p>
        </div>
      )}
    </div>
  );
}

export default Logs;
