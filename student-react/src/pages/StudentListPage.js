import React from 'react';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import './StudentList.css'



const StudentListPage = () => (
    <React.Fragment>
        <h1 className='h1'>Student List Page</h1>
        <StudentList /> 
        <AddStudentForm />
    </React.Fragment>
);
export default StudentListPage;
