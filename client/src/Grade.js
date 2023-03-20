import React, { useState } from "react";
import AddGrade from "./AddGrade";
import GradeGrid from "./GradeGrid";

const Grade = () => {
    const [updatedKey, setUpdatedKey] = useState();
    return (
        <div className="content">
            <AddGrade setUpdatedKey={setUpdatedKey} />
            <GradeGrid key={updatedKey} />
        </div>
    )
};

export default Grade;