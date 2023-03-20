import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CourseGrid() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const [columnDefs] = useState([
        { field: 'id', headerName: 'ID' },
        { field: 'course' },
    ]);

    const defaultColumnDefinition = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (
        <div className="card" style={{
            marginRight: "auto",
            width: '50%'
        }}>
            <div className='card-header'>
                <h5>Existing Courses</h5>
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

export default CourseGrid;
