import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.post('/employees', { name, email });
            setEmployees([...employees, res.data]);
            setName('');
            setEmail('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create employee');
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h2>Manage Employees</h2>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '32px'}}>
                <div className="glass-panel">
                    <h3>Add Employee</h3>
                    {error && <div style={{color: 'var(--danger-color)', marginBottom: '16px'}}>{error}</div>}
                    <form onSubmit={handleCreateEmployee}>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn">Add Employee</button>
                    </form>
                </div>

                <div className="glass-panel">
                    <h3>Employee List ({employees.length})</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td>#{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                    </tr>
                                ))}
                                {employees.length === 0 && (
                                    <tr>
                                        <td colSpan="3" style={{textAlign: 'center', opacity: 0.5}}>No employees found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;
