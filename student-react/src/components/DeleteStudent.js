import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BASE_URL from "../data/config.js";

const DeleteStudent = ({ studentId }) => {
  const [id, setId] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);

  // Set the initial value of the ID field when the component mounts
  useEffect(() => {
    setId(studentId);
  }, [studentId]);

  const handleDelete = (event) => {
    event.preventDefault(); // Prevent form submission default behavior
    fetch(`${BASE_URL}students/${id}`, {
      method: "delete",
    })
      .then((response) => {
        if (response.ok) {
          setDeleteFlag(true); // Use this flag for redirection
          console.log("Student deleted successfully");
        } else {
          console.error("Failed to delete student");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Redirect after delete
  if (deleteFlag) {
    return <Navigate to={{ pathname: "/list", state: { refresh: true } }} />;
  }

  return (
    <div>
      <h3>Delete Student</h3>
      <form onSubmit={handleDelete}>
        <input type="text" value={id} readOnly />
        <br />
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteStudent;
