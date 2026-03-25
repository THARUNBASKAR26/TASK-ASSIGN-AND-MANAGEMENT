import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filterEmployeeId, setFilterEmployeeId] = useState('');
    const [requestorId, setRequestorId] = useState('');

    useEffect(() => {
        fetchData();
    }, [filterEmployeeId]);

    const fetchData = async () => {
        try {
            const [empsRes, tasksRes] = await Promise.all([
                api.get('/employees'),
                filterEmployeeId ? api.get(`/tasks/employee/${filterEmployeeId}`) : api.get('/tasks')
            ]);
            setEmployees(empsRes.data);
            setTasks(tasksRes.data);
            if(empsRes.data.length > 0 && !requestorId) {
                setRequestorId(empsRes.data[0].id); // mock current logged in user
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.patch(`/tasks/${taskId}/status?status=${newStatus}`);
            fetchData();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (taskId) => {
        if(!window.confirm("Delete this task?")) return;
        try {
            await api.delete(`/tasks/${taskId}?requestorId=${requestorId}`);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete task (Only the creator can delete it)');
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h2>Task Dashboard</h2>
                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                    <div>
                        <label style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '8px'}}>Filter by Assignee:</label>
                        <select className="form-control" style={{width: 'auto', display: 'inline-block'}} value={filterEmployeeId} onChange={(e) => setFilterEmployeeId(e.target.value)}>
                            <option value="">All Employees</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '8px'}}>Simulating User:</label>
                        <select className="form-control" style={{width: 'auto', display: 'inline-block'}} value={requestorId} onChange={(e) => setRequestorId(e.target.value)}>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="glass-panel">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Assignee</th>
                                <th>Creator</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>
                                        <div style={{fontWeight: 600, color: '#fff'}}>{task.title}</div>
                                        <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px'}}>{task.description}</div>
                                    </td>
                                    <td>
                                        <select 
                                            className={`form-control status-badge status-${task.status}`} 
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            style={{padding: '4px 8px', height: 'auto', width: 'auto'}}
                                        >
                                            <option value="TODO">TODO</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </td>
                                    <td>{task.assignedTo ? task.assignedTo.name : <span style={{opacity: 0.5}}>Unassigned</span>}</td>
                                    <td>{task.createdBy?.name}</td>
                                    <td>{task.dueDate}</td>
                                    <td>
                                        <button className="btn btn-danger" style={{padding: '6px 12px', fontSize: '0.8rem'}} onClick={() => handleDelete(task.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{textAlign: 'center', opacity: 0.5, padding: '32px'}}>No tasks found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
