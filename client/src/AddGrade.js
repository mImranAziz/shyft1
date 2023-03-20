import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddGrade({ setUpdatedKey }) {
    const [grade, setGrade] = useState('');
    const [studentId, setStudent] = useState('');
    const [courseId, setCourse] = useState('');

    const [allStudents, setAllStudents] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(response => response.json())
            .then(data => setAllCourses(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => setAllStudents(data));
    }, []);

    function handleGradeChange(event) {
        setGrade(event.target.value);
    }

    function handleStudentChange(event) {
        setStudent(event.target.value);
    }

    function handleCourseChange(event) {
        setCourse(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:5000/grades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grade,
                student_id: studentId,
                course_id: courseId
            })
        }).then(async (response) => {
            if (response.ok) {
                toast.success('Grade added successfully.');
                await response.json(); // get the full response. 
                setUpdatedKey(Math.random()); // refresh the grid 

                // Clear the fields 
                setCourse('');
                setGrade('');
                setStudent('');
            } else {
                toast.error('Grade already exists.');
            }
        }).catch(error => {
            toast.error('An error occurred.' + error);
            console.error(error); // For later. Toast goes away fast
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Grade">Grade:</label>
                    <input className="form-control" type="text" id="grade" value={grade} onChange={handleGradeChange} required />
                </div>
                <div>
                    <label htmlFor="student">Student:</label>
                    <select value={studentId} onChange={handleStudentChange} required>
                        <option value="">Select a student</option>
                        {allStudents.map((student) => (
                            <option key={student.id} value={student.id}>
                                {`${student.first_name} ${student.last_name} `}
                            </option>
                        )
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="course">Course:</label>
                    <select value={courseId} onChange={handleCourseChange} required>
                        <option value="">Select a Course</option>
                        {allCourses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.course}
                            </option>
                        )
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Grade</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddGrade;
