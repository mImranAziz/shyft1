import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse({ setUpdatedKey }) {
    const [course, setCourse] = useState('');

    function handleCourseChange(event) {
        setCourse(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:5000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course
            })
        }).then(async (response) => {
            if (response.ok) {
                toast.success('Course added successfully.');
                await response.json(); // get the full response. 
                setUpdatedKey(Math.random()); // refresh the grid 
                setCourse('')
            } else {
                toast.error('An error occurred.');
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
                    <label htmlFor="course">Course Name:</label>
                    <input className="form-control" type="text" id="course" value={course} onChange={handleCourseChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Course</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddCourse;
