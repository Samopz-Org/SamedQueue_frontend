import React, { useState } from "react";
import PropTypes from "prop-types";

const RequisitionForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleCancelEdit,
  editingRequisition,
}) => {
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setSuccessMessage(
      editingRequisition
        ? "Requisition updated successfully!"
        : "Requisition created successfully!"
    );
    // Optionally clear the success message after a delay
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const inputFields = [
    {
      id: "username",
      type: "text",
      name: "username",
      placeholder: "Requester Name",
    },
    {
      id: "department",
      type: "text",
      name: "department",
      placeholder: "Department",
    },
    { id: "amount", type: "number", name: "amount", placeholder: "Amount" },
    { id: "purpose", type: "text", name: "purpose", placeholder: "Purpose" },
  ];

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        {inputFields.map((field) => (
          <input
            key={field.id}
            id={field.id}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={(e) => {
              if (field.name === "amount") {
                const value = parseFloat(e.target.value);
                if (value > 0 || e.target.value === "") handleInputChange(e);
              } else {
                handleInputChange(e);
              }
            }}
            required
          />
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">
          {editingRequisition ? "Update Requisition" : "Create Requisition"}
        </button>
        {editingRequisition && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

RequisitionForm.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    purpose: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func,
  editingRequisition: PropTypes.bool,
};

RequisitionForm.defaultProps = {
  handleCancelEdit: () => {},
};

export default RequisitionForm;