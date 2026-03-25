import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1>Task Flow</h1>
            <nav>
                <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    Dashboard
                </NavLink>
                <NavLink to="/tasks/new" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    Create Task
                </NavLink>
                <NavLink to="/employees" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    Employees
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
