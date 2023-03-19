import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <h1 className="alert alert-dark align-middle">Welcome to Students App</h1>
            <div className="container">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/student">Student</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
};

export default Layout;