import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Flag, Tag, X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export const CreateTaskPage = () => {
    const navigate = useNavigate();
    const { createTask, categories } = useTasks();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        const success = await createTask({
            ...data,
            status: 'pending',
        });
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}>
                    Add Task
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9a9a9a',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                >
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.5rem'
                    }}>
                        Task name
                    </label>
                    <input
                        {...register('title', { required: true })}
                        placeholder="e.g., Buy groceries"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: '#1f1f1f',
                            border: '1px solid #3a3a3a',
                            borderRadius: '5px',
                            color: '#ffffff',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.5rem'
                    }}>
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        placeholder="Add details..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: '#1f1f1f',
                            border: '1px solid #3a3a3a',
                            borderRadius: '5px',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            <CalendarIcon size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Due Date
                        </label>
                        <input
                            type="date"
                            {...register('dueDate', { required: true })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#1f1f1f',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            Time (Optional)
                        </label>
                        <input
                            type="time"
                            {...register('dueTime')}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#1f1f1f',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            <Flag size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Priority
                        </label>
                        <select
                            {...register('priority')}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#1f1f1f',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            <Tag size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Category
                        </label>
                        <select
                            {...register('categoryId')}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#1f1f1f',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                        >
                            <option value="">No category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid #3a3a3a',
                            borderRadius: '5px',
                            color: '#9a9a9a',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
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
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};
