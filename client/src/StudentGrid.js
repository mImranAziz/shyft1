import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";

function StudentGrid() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const [columnDefs] = useState([
        { field: 'id', headerName: 'ID' },
        { field: 'first_name', headerName: 'First Name' },
        { field: 'last_name', headerName: 'Family Name' },
        {
            field: 'date_of_birth', headerName: 'Date of Birth', cellRenderer: (data) => {
                const { date_of_birth: dob } = data.data;
                return dayjs(dob).format('MMM DD YYYY');
            }
        },
    ]);

    const defaultColumnDefinition = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (
        <div className="card" style={{
            marginRight: "auto",
            width: '70%'
        }}>
            <div className='card-header'>
                <h5>Existing students</h5>
            </div>
            <div className='card-body>'>
                <AgGridReact className="ag-theme-material"
                    animateRows
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColumnDefinition}
                    domLayout='autoHeight'
                /></div>
        </div>)
}

export default StudentGrid;
