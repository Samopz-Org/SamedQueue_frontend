import React, { useState } from "react";
import axios from "axios";
import "../styling/staffAttendance.css";

const StaffAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Empty dependency array to run only once on mount

  const handleFilterByDate = () => {
    if (!filterDate) {
      setErrorMessage("Please select a date to filter.");
      return;
    }

    setLoading(true);
    axios
      .get(`${API_URL}/api/attendance/by-date`, {
        params: { date: filterDate },
      })
      .then((response) => {
        setAttendanceRecords(response.data);
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error fetching attendance by date:", error);
        setErrorMessage(
          "Failed to fetch attendance records. Please try again."
        );
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleGetAttendanceByStaff = (staffId) => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/attendance/by-staff/${staffId}`)
      .then((response) => {
        setAttendanceRecords(response.data);
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error fetching attendance by staff:", error);
        setErrorMessage(
          "Failed to fetch attendance records. Please try again."
        );
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const filteredRecords = filterDate
    ? attendanceRecords.filter(
        (record) =>
          record.checkInTime && record.checkInTime.startsWith(filterDate)
      )
    : attendanceRecords;

  return (
    <div className="staff-attendance">
      <h3>Staff Attendance</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <p className="loading-message">Loading...</p>}{" "}
      {/* Loading Indicator */}
      {/* Filter Attendance Records */}
      <div className="filter-records">
        <h4>Filter Records</h4>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          aria-label="Filter by Date"
        />
        <button onClick={handleFilterByDate} disabled={loading}>
          {loading ? "Filtering..." : "Filter"}
        </button>
      </div>
      {/* Display Attendance Records */}
      <div className="attendance-records">
        <h3>Attendance Records</h3>
        {filteredRecords.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Status</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>
                    <button
                      onClick={() => handleGetAttendanceByStaff(record.staffId)}
                      aria-label={`View attendance for staff ID ${record.staffId}`}
                      disabled={loading}
                    >
                      {record.staffId}
                    </button>
                  </td>
                  <td>{record.status}</td>
                  <td>{formatDate(record.checkInTime)}</td>
                  <td>{formatDate(record.checkOutTime)}</td>
                  <td>{record.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StaffAttendance;
