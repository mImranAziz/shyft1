import React, { useState } from "react";
import AddCourse from "./AddCourse";
import CourseGrid from "./CourseGrid";

const Course = () => {
    const [updatedKey, setUpdatedKey] = useState();
    return (
        <div className="content">
            <AddCourse setUpdatedKey={setUpdatedKey} />
            <CourseGrid key={updatedKey} />
        </div>
    )
};

export default Course;