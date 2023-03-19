import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

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
        { field: 'date_of_birth', headerName: 'Date of Birth' },
    ]);

    const defaultColumnDefinition = useMemo(() => ({
        sortable: true,
        filter: true,
    }), []);

    return (<AgGridReact className="ag-theme-material"
        animateRows
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColumnDefinition}
    />)
}

export default StudentGrid;
