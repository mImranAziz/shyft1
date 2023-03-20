import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function GradeGrid() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/grades')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const [columnDefs] = useState([
        { field: 'course' },
        { field: 'student' },
        { field: 'grade' },
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
                <h5>Grades</h5>
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

export default GradeGrid;
