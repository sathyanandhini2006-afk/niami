import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTasks } from '../../logic/context/TaskContext';

export const CalendarPage = () => {
    const { tasks } = useTasks();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const getTasksForDay = (day: Date) => {
        const dayStr = format(day, 'yyyy-MM-dd');
        return tasks.filter(t => t.dueDate.startsWith(dayStr));
    };

    return (
        <div style={{
            maxWidth: '1200px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {format(currentDate, 'MMMM yyyy')}
                    </h1>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                            style={{
                                padding: '0.5rem',
                                background: '#282828',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#282828',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                            style={{
                                padding: '0.5rem',
                                background: '#282828',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

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

            {/* Calendar Grid */}
            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                {/* Weekday Headers */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    borderBottom: '1px solid #3a3a3a'
                }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div
                            key={day}
                            style={{
                                padding: '1rem',
                                textAlign: 'center',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#9a9a9a',
                                textTransform: 'uppercase'
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridAutoRows: 'minmax(120px, auto)'
                }}>
                    {calendarDays.map((day, idx) => {
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const dayTasks = getTasksForDay(day);
                        const isDayToday = isToday(day);

                        return (
                            <div
                                key={idx}
                                onClick={() => navigate('/tasks/create', { state: { date: format(day, 'yyyy-MM-dd') } })}
                                style={{
                                    padding: '0.75rem',
                                    borderRight: idx % 7 !== 6 ? '1px solid #3a3a3a' : 'none',
                                    borderBottom: idx < calendarDays.length - 7 ? '1px solid #3a3a3a' : 'none',
                                    background: !isCurrentMonth ? '#1f1f1f' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: isDayToday ? '#dc4c3e' : isCurrentMonth ? '#ffffff' : '#5a5a5a',
                                    marginBottom: '0.5rem'
                                }}>
                                    {format(day, 'd')}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {dayTasks.slice(0, 3).map(task => (
                                        <div
                                            key={task.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/tasks/${task.id}`);
                                            }}
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                background: task.priority === 'high' ? '#dc4c3e' :
                                                    task.priority === 'medium' ? '#f59e0b' : '#10b981',
                                                borderRadius: '3px',
                                                fontSize: '0.75rem',
                                                color: 'white',
                                                fontWeight: '500',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                    {dayTasks.length > 3 && (
                                        <div style={{
                                            fontSize: '0.625rem',
                                            color: '#9a9a9a',
                                            paddingLeft: '0.5rem'
                                        }}>
                                            +{dayTasks.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
