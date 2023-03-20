import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent({ setUpdatedKey }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const minAgeOfStudent = dayjs().subtract(10, 'year'); // 10 YO

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleDobChange(value) {
        setDob(value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age >= 10) {
            fetch('http://localhost:5000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    date_of_birth: dob
                })
            }).then(async (response) => {
                if (response.ok) {
                    toast.success('Student added successfully.');
                    await response.json(); // get the full response. 
                    setUpdatedKey(Math.random()); // refresh the grid 

                    // Clear the fields 
                    setFirstName('');
                    setLastName('');
                    setDob('');
                } else {
                    toast.error('An error occurred.');
                }
            })
                .catch(error => {
                    toast.error('An error occurred.' + error);
                    console.error(error); // For later. Toast goes away fast
                });
        } else {
            toast.error('The student must be at least 10 years old.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input className="form-control" type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} required />
                </div>
                <div>
                    <label htmlFor="lastName">Family Name:</label>
                    <input className="form-control" type="text" id="lastName" value={lastName} onChange={handleLastNameChange} required />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <div className='alert alert-info'>The student must be at least 10 years old. </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={handleDobChange}
                            defaultValue={dayjs('2013-10-03')}
                            value={dob}
                            id="dob"
                            maxDate={minAgeOfStudent}
                            required />
                    </LocalizationProvider>
                </div>
                <button type="submit" className="btn btn-primary">Add student</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddStudent;
