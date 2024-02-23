import React from "react";
import { useParams } from "react-router-dom";
// import students from '../data/students';
import StudentList from "../components/StudentList";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";

import AddStudentForm from "../components/AddStudentForm";
import DeleteStudent from "../components/DeleteStudent";
import UpdateStudent from "../components/UpdateStudent";
// import StudentList from '../components/StudentList';

import BASE_URL from "../data/config";

const StudentDetailPage = () => {
  const { id } = useParams();
  // const student = students.find((data) => data.studentId === Number(id));

  const [studentInfo, setStudentInfo] = useState({
    FirstName: "",
    LastName: "",
    School: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}students/${id}`);
      console.log(result);
      const body = await result.json();
      console.log(body);
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  if (!studentInfo) {
    return <NotFoundPage />;
  }

  return (
    <React.Fragment>
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.StudentId} />
      </div>
      <h4 className="text-danger">Student ID={studentInfo.StudentId}</h4>
      <p>
        <b>Name: </b>
        {studentInfo.FirstName} {studentInfo.LastName}
      </p>
      <p>
        <b>School: </b>
        {studentInfo.School}
      </p>

      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
        <UpdateStudent studentId={studentInfo.StudentId} />
        <DeleteStudent studentId={studentInfo.StudentId} />
      </div>
    </React.Fragment>
  );
};

export default StudentDetailPage;
