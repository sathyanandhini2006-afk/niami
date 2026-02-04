import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTasks } from '../context/TaskContext';
import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

export const AnalyticsPage = () => {
    const { tasks, categories } = useTasks();

    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;

    const statusData = [
        { name: 'Completed', value: completed },
        { name: 'Pending', value: pending },
    ];
    const statusColors = ['#10b981', '#dc4c3e'];

    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;

    const priorityData = [
        { name: 'High', value: high },
        { name: 'Medium', value: medium },
        { name: 'Low', value: low },
    ];
    const priorityColors = ['#dc4c3e', '#f59e0b', '#10b981'];

    const categoryData = categories.map(c => ({
        name: c.name,
        value: tasks.filter(t => t.categoryId === c.id).length
    })).filter(d => d.value > 0);

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '2rem'
            }}>
                Analytics
            </h1>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                    }}>
                        <TrendingUp size={20} style={{ color: '#dc4c3e' }} />
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#9a9a9a',
                            textTransform: 'uppercase'
                        }}>
                            Total Tasks
                        </span>
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {tasks.length}
                    </div>
                </div>

                <div style={{
                    padding: '1.5rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem'
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
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {completed}
                    </div>
                </div>

                <div style={{
                    padding: '1.5rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                    }}>
                        <Clock size={20} style={{ color: '#f59e0b' }} />
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
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {pending}
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem'
            }}>
                <div style={{
                    padding: '2rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px'
                }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '1.5rem'
                    }}>
                        Task Status
                    </h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={statusColors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#1f1f1f',
                                        border: '1px solid #3a3a3a',
                                        borderRadius: '5px',
                                        color: '#ffffff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{
                    padding: '2rem',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px'
                }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '1.5rem'
                    }}>
                        Priority Distribution
                    </h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={priorityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {priorityData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={priorityColors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#1f1f1f',
                                        border: '1px solid #3a3a3a',
                                        borderRadius: '5px',
                                        color: '#ffffff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {categoryData.length > 0 && (
                    <div style={{
                        padding: '2rem',
                        background: '#282828',
                        border: '1px solid #3a3a3a',
                        borderRadius: '8px',
                        gridColumn: 'span 2'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '1.5rem'
                        }}>
                            Tasks by Category
                        </h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                                    <XAxis dataKey="name" stroke="#9a9a9a" />
                                    <YAxis stroke="#9a9a9a" />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#1f1f1f',
                                            border: '1px solid #3a3a3a',
                                            borderRadius: '5px',
                                            color: '#ffffff'
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#dc4c3e" radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
