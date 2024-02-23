import React, { useState, useEffect } from 'react';
import BASE_URL from '../data/config.js';

const ListStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}students/`)
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <React.Fragment>
            <div className="panel panel-default">
                <h3>Students List</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.Id}>
                                <td>{student.FirstName}</td>
                                <td>{student.LastName}</td>
                                <td>{student.School}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default ListStudents;
