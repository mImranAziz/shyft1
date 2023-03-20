import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <div className="card" style={{ paddingBottom: "1rem" }}>
            <h1 className="alert alert-dark">Welcome to Students App</h1>
            <div className="container">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/student">Student</Link>
                        </li>
                        <li>
                            <Link to="/course">Course</Link>
                        </li>
                        <li>
                            <Link to="/grade">Grade</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    )
};

export default Layout;