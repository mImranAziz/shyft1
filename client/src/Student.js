import React, { useState } from "react";
import StudentGrid from "./StudentGrid";
import AddStudent from "./AddStudent";

const Student = () => {
    const [updatedKey, setUpdatedKey] = useState();
    return (
        <div className="content">
            <AddStudent setUpdatedKey={setUpdatedKey} />
            <StudentGrid key={updatedKey} />
        </div>
    )
};

export default Student;