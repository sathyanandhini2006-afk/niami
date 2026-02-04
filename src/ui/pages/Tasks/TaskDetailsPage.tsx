import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Flag, Tag, Trash2 } from 'lucide-react';
import { useTasks } from '../../../logic/context/TaskContext';
import { useToast } from '../../../logic/context/ToastContext';

export const TaskDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, toggleTaskStatus, deleteTask, categories } = useTasks();
    const { addToast } = useToast();

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return (
            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '3rem 1.5rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem' }}>
                    Task not found
                </h1>
                <button
                    onClick={() => navigate('/tasks')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#dc4c3e',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                    }}
                >
                    Back to Tasks
                </button>
            </div>
        );
    }

    const category = categories.find(c => c.id === task.categoryId);

    const handleDelete = async () => {
        await deleteTask(task.id);
        addToast('Task deleted', 'success');
        navigate('/tasks');
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#9a9a9a',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '2rem',
                    padding: '0.5rem'
                }}
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '2rem'
                }}>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        opacity: task.status === 'completed' ? 0.6 : 1
                    }}>
                        {task.title}
                    </h1>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => navigate(`/tasks/edit/${task.id}`)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#3a3a3a',
                                border: 'none',
                                borderRadius: '5px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'transparent',
                                border: '1px solid #dc4c3e',
                                borderRadius: '5px',
                                color: '#dc4c3e',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </div>

                {task.description && (
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#9a9a9a',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        {task.description}
                    </p>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#9a9a9a',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            <Calendar size={14} /> Due Date
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#ffffff',
                            fontWeight: '500'
                        }}>
                            {task.dueDate} {task.dueTime && `at ${task.dueTime}`}
                        </div>
                    </div>

                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#9a9a9a',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            <Flag size={14} /> Priority
                        </div>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            background: task.priority === 'high' ? '#dc4c3e' :
                                task.priority === 'medium' ? '#f59e0b' : '#10b981',
                            borderRadius: '5px',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            {task.priority}
                        </span>
                    </div>

                    {category && (
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#9a9a9a',
                                textTransform: 'uppercase',
                                marginBottom: '0.5rem'
                            }}>
                                <Tag size={14} /> Category
                            </div>
                            <div style={{
                                fontSize: '0.875rem',
                                color: '#ffffff',
                                fontWeight: '500'
                            }}>
                                {category.name}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => toggleTaskStatus(task)}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: task.status === 'completed' ? '#3a3a3a' : '#dc4c3e',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginTop: '1rem'
                    }}
                >
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}
                </button>
            </div>
        </div>
    );
};
