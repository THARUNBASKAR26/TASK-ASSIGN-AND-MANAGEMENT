import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const TaskFormPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('TODO');
    const [assignedToId, setAssignedToId] = useState('');
    const [createdById, setCreatedById] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await api.get('/employees');
            setEmployees(res.data);
            if(res.data.length > 0) {
                setCreatedById(res.data[0].id); // default creator
            }
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await api.post('/tasks', {
                title,
                description,
                status,
                assignedToId: assignedToId ? parseInt(assignedToId) : null,
                createdById: parseInt(createdById),
                dueDate
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task. Check the due date and creator.');
        }
    };

    return (
        <div className="animate-fade-in" style={{maxWidth: '800px'}}>
            <div className="page-header">
                <h2>Create New Task</h2>
            </div>
            
            <div className="glass-panel">
                {error && <div style={{color: 'var(--danger-color)', marginBottom: '16px', padding: '12px', background: 'rgba(248, 81, 73, 0.1)', borderRadius: '8px'}}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                        
                        <div className="form-group" style={{gridColumn: '1 / span 2'}}>
                            <label>Description</label>
                            <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Creator (Required for Permissions)</label>
                            <select className="form-control" value={createdById} onChange={(e) => setCreatedById(e.target.value)} required>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                                {employees.length === 0 && <option value="">No employees available</option>}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Assign To (Optional)</label>
                            <select className="form-control" value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)}>
                                <option value="">-- Unassigned --</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Due Date</label>
                            <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                        </div>
                    </div>
                    
                    <div style={{marginTop: '24px', display: 'flex', gap: '16px'}}>
                        <button type="submit" className="btn" disabled={employees.length === 0}>Create Task</button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormPage;
