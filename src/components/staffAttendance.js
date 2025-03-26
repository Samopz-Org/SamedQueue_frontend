import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/staffAttendance.css";

const StaffAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    staffId: "",
    status: "Present",
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
  });
  const [filterDate, setFilterDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch all attendance records on component mount
    setLoading(true);
    axios
      .get(`${API_URL}/api/attendance`)
      .then((response) => {
        setAttendanceRecords(response.data);
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
        setErrorMessage(
          "Failed to fetch attendance records. Please try again."
        );
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount

  const handleAddRecord = () => {
    // Validate the new record
    if (!newRecord.staffId || !newRecord.status) {
      setErrorMessage("Staff ID and status are required.");
      return;
    }
    if (new Date(newRecord.checkInTime) >= new Date(newRecord.checkOutTime)) {
      setErrorMessage("Check-In Time must be before Check-Out Time.");
      return;
    }

    // Add a new attendance record using Axios
    setLoading(true);
    axios
      .post(`${API_URL}/api/attendance`, newRecord)
      .then((response) => {
        setAttendanceRecords([...attendanceRecords, response.data.attendance]);
        setNewRecord({
          staffId: "",
          status: "Present",
          checkInTime: "",
          checkOutTime: "",
          remarks: "",
        });
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error adding record:", error);
        setErrorMessage("Failed to add the record. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

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
      <h1>Staff Attendance</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <p className="loading-message">Loading...</p>}{" "}
      {/* Loading Indicator */}
      <div className="add-record">
        <h3>Add Attendance</h3>
        <input
          type="text"
          placeholder="Staff ID"
          value={newRecord.staffId}
          onChange={(e) =>
            setNewRecord({ ...newRecord, staffId: e.target.value })
          }
          aria-label="Staff ID"
        />
        <select
          value={newRecord.status}
          onChange={(e) =>
            setNewRecord({ ...newRecord, status: e.target.value })
          }
          aria-label="Status"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="On Leave">On Leave</option>
        </select>
        <input
          type="datetime-local"
          placeholder="Check-In Time"
          value={newRecord.checkInTime}
          onChange={(e) =>
            setNewRecord({ ...newRecord, checkInTime: e.target.value })
          }
          aria-label="Check-In Time"
        />
        <input
          type="datetime-local"
          placeholder="Check-Out Time"
          value={newRecord.checkOutTime}
          onChange={(e) =>
            setNewRecord({ ...newRecord, checkOutTime: e.target.value })
          }
          aria-label="Check-Out Time"
        />
        <input
          type="text"
          placeholder="Remarks"
          value={newRecord.remarks}
          onChange={(e) =>
            setNewRecord({ ...newRecord, remarks: e.target.value })
          }
          aria-label="Remarks"
        />
        <button onClick={handleAddRecord} disabled={loading}>
          {loading ? "Adding..." : "Add Record"}
        </button>
      </div>
      {/* Filter Attendance Records */}
      <div className="filter-records">
        <h3>Filter Records</h3>
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
