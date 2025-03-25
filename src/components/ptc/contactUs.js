import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (name.trim().length < 2) {
      setErrorMessage("Name must be at least 2 characters long.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (message.trim().length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/contact",
        "https://samedqueue-app.onrender.com/api/contact",

        {
          name,
          email,
          message,
        }
      );

      setSuccessMessage(
        response.data.message ||
          "Thank you for contacting us! We will get back to you soon."
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {successMessage && (
        <p className="success-message" aria-live="polite">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="error-message" aria-live="polite">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ContactUs;
