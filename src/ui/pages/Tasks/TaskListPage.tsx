import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckCircle, Circle } from 'lucide-react';
import { useTasks } from '../../../logic/context/TaskContext';

export const TaskListPage = () => {
    const { tasks, toggleTaskStatus } = useTasks();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h1 className="shimmer-text" style={{
                    fontSize: '2rem',
                    fontWeight: '800'
                }}>
                    All Tasks
                </h1>
                <button
                    onClick={() => navigate('/tasks/create')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#dc4c3e',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Plus size={18} /> Add Task
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                borderBottom: '1px solid #3a3a3a',
                paddingBottom: '0.5rem'
            }}>
                {[
                    { key: 'all', label: 'All', count: tasks.length },
                    { key: 'pending', label: 'Pending', count: pendingCount },
                    { key: 'completed', label: 'Completed', count: completedCount }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key as any)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: filter === tab.key ? '#282828' : 'transparent',
                            border: 'none',
                            borderRadius: '5px',
                            color: filter === tab.key ? '#ffffff' : '#9a9a9a',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {tab.label}
                        <span style={{
                            padding: '0.125rem 0.5rem',
                            background: filter === tab.key ? '#dc4c3e' : '#3a3a3a',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                        }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredTasks.length > 0 ? filteredTasks.map(task => (
                    <div
                        key={task.id}
                        style={{
                            padding: '1rem',
                            background: 'rgba(26, 31, 58, 0.4)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(42, 47, 74, 0.5)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            transition: 'all 0.2s',
                            opacity: task.status === 'completed' ? 0.6 : 1
                        }}
                    >
                        <button
                            onClick={() => toggleTaskStatus(task)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {task.status === 'completed' ? (
                                <CheckCircle size={20} style={{ color: '#10b981' }} />
                            ) : (
                                <Circle size={20} style={{
                                    color: task.priority === 'high' ? '#dc4c3e' :
                                        task.priority === 'medium' ? '#f59e0b' : '#9a9a9a'
                                }} />
                            )}
                        </button>

                        <div
                            onClick={() => navigate(`/tasks/${task.id}`)}
                            style={{
                                flex: 1,
                                cursor: 'pointer'
                            }}
                        >
                            <h3 style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#ffffff',
                                marginBottom: '0.25rem',
                                textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                            }}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#9a9a9a',
                                    marginBottom: '0.5rem'
                                }}>
                                    {task.description}
                                </p>
                            )}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                fontSize: '0.75rem',
                                color: '#9a9a9a'
                            }}>
                                <span>{task.dueDate}</span>
                                {task.dueTime && <span>{task.dueTime}</span>}
                                <span style={{
                                    padding: '0.125rem 0.5rem',
                                    background: task.priority === 'high' ? '#dc4c3e' :
                                        task.priority === 'medium' ? '#f59e0b' : '#10b981',
                                    borderRadius: '3px',
                                    color: 'white',
                                    fontSize: '0.625rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: '#9a9a9a'
                    }}>
                        <p style={{ fontSize: '0.875rem' }}>
                            No tasks found. Create your first task!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
