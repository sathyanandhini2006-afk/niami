import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { X, Calendar as CalendarIcon, Flag, Tag } from 'lucide-react';
import { useTasks } from '../../../logic/context/TaskContext';
import { useToast } from '../../../logic/context/ToastContext';

export const EditTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, updateTask, categories } = useTasks();
    const { addToast } = useToast();

    const task = tasks.find(t => t.id === id);
    const { register, handleSubmit } = useForm({
        defaultValues: task
    });

    if (!task) {
        return (
            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '3rem 1.5rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Task not found</h1>
            </div>
        );
    }

    const onSubmit = async (data: any) => {
        await updateTask(task.id, data);
        addToast('Task updated successfully', 'success');
        navigate(`/tasks/${task.id}`);
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
                    Edit Task
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
                            Time
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
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};
