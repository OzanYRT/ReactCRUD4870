import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import BASE_URL from "../data/config.js";

const UpdateStudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  // Use useParams hook to get studentId from URL
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}students/${id}`;
      console.log(id);
      console.log(`Fetching data from: ${url}`); // Log the URL to verify it's correct
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setSchool(data.school);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`${BASE_URL}students/${id}`, {
        method: "PUT", // Use PUT method for update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: id,
          firstName,
          lastName,
          school,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Assuming server sends back a detailed error message
        console.error("Server responded with an error:", errorData);
        throw new Error(`Failed to update student: ${errorData.message}`); // Use server's error message
      }

      if (response.ok) {
        setUpdateFlag(true); // Set flag for redirection after successful update
      } else {
        throw new Error("Failed to update student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Redirect to the list page after update
  if (updateFlag) {
    return <Navigate to="/list" state={{ refresh: true }} />;
  }

  return (
    <div className="panel panel-default">
      <form onSubmit={handleSubmit}>
        <h3>Update Student</h3>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input
            className="form-control"
            type="text"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
