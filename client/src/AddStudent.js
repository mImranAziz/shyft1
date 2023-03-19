import React, { useState } from 'react';

function AddStudent({ setUpdatedKey }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [notification, setNotification] = useState('');

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleDobChange(event) {
        setDob(event.target.value);
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
            })
                .then(async (response) => {
                    if (response.ok) {
                        setNotification('Records inserted successfully.');
                        const data = await response.json();
                        setUpdatedKey(data.id); // refresh the grid 

                        // Clear the fields 
                        setFirstName('');
                        setLastName('');
                        setDob('');
                    } else {
                        setNotification('An error occurred.');
                    }
                })
                .catch(error => {
                    setNotification('An error occurred.' + error);
                    console.error(error);
                });
        } else {
            setNotification('You must be at least 10 years old to insert records.');
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
                    <label htmlFor="dob">Date of Birth:</label>
                    <input className="form-control" type="date" id="dob" value={dob} onChange={handleDobChange} required />
                </div>
                <button type="submit" className="btn btn-secondary">Insert Records</button>
            </form>
            {notification && <p>{notification}</p>}
        </div>
    );
}

export default AddStudent;
