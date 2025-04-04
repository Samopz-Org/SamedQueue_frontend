import React, { useState } from "react";
import axios from "axios";
import "../styling/staffAttendance.css";

const AddAttendance = ({ onAttendanceAdded }) => {
  const [newRecord, setNewRecord] = useState({
    staffId: "",
    status: "Present",
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
  });
  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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
        setNewRecord({
          staffId: "",
          status: "Present",
          checkInTime: "",
          checkOutTime: "",
          remarks: "",
        });
        setMessage(response.data.message); // Extract the result property
        setErrorMessage(""); // Clear any previous error messages
        if (onAttendanceAdded) {
          onAttendanceAdded(response.data.attendance); // Notify parent component
        }
      })
      .catch((error) => {
        console.error("Error adding record:", error);
        setErrorMessage("Failed to add the record. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="add-attendance">
      <h3>Staff Attendance</h3>

      <h4>Add Attendance</h4>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="add-record">
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddAttendance;
