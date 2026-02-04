import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Plus, CheckCircle, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export const DashboardPage = () => {
    const { tasks } = useTasks();
    const navigate = useNavigate();

    const todayTasks = tasks.filter(t =>
        t.status === 'pending' &&
        t.dueDate.startsWith(format(new Date(), 'yyyy-MM-dd'))
    );

    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: '3rem'
            }}>
                <h1 className="shimmer-text" style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem'
                }}>
                    Today
                </h1>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#9a9a9a'
                }}>
                    {format(new Date(), 'EEEE, MMMM d')}
                </p>
            </div>

            {/* Add Task Button */}
            <button
                onClick={() => navigate('/tasks/create')}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    border: '2px dashed #3a3a3a',
                    borderRadius: '5px',
                    color: '#9a9a9a',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem'
                }}
            >
                <Plus size={18} style={{ color: '#dc4c3e' }} />
                Add task
            </button>

            {/* Today's Tasks */}
            <div style={{ marginBottom: '3rem' }}>
                {todayTasks.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {todayTasks.map(task => (
                            <div
                                key={task.id}
                                onClick={() => navigate(`/tasks/${task.id}`)}
                                className="glass-card"
                                style={{
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: task.priority === 'high' ? '#dc4c3e' :
                                        task.priority === 'medium' ? '#f59e0b' : '#9a9a9a'
                                }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#ffffff',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {task.title}
                                    </h3>
                                    {task.description && (
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: '#9a9a9a'
                                        }}>
                                            {task.description}
                                        </p>
                                    )}
                                </div>
                                {task.dueTime && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#9a9a9a'
                                    }}>
                                        {task.dueTime}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: '#9a9a9a'
                    }}>
                        <CalendarIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                        <p style={{ fontSize: '0.875rem' }}>
                            No tasks for today. Enjoy your day!
                        </p>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '3rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '5px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                    }}>
                        <Clock size={20} style={{ color: '#dc4c3e' }} />
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#9a9a9a',
                            textTransform: 'uppercase'
                        }}>
                            Pending
                        </span>
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {pendingCount}
                    </div>
                </div>

                <div style={{
                    padding: '1.5rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '5px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                    }}>
                        <CheckCircle size={20} style={{ color: '#10b981' }} />
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#9a9a9a',
                            textTransform: 'uppercase'
                        }}>
                            Completed
                        </span>
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {completedCount}
                    </div>
                </div>
            </div>
        </div>
    );
};
