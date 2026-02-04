import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';

export const CategoriesPage = () => {
    const { categories, createCategory, deleteCategory } = useTasks();
    const { addToast } = useToast();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleCreate = async () => {
        if (!newCategoryName.trim()) {
            addToast('Please enter a category name', 'error');
            return;
        }
        await createCategory({ name: newCategoryName, color: '#dc4c3e' });
        setNewCategoryName('');
        addToast('Category created', 'success');
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '2rem'
            }}>
                Categories
            </h1>

            {/* Add Category */}
            <div style={{
                background: 'rgba(26, 31, 58, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(42, 47, 74, 0.5)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category name..."
                        onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: '#1f1f1f',
                            border: '1px solid #3a3a3a',
                            borderRadius: '5px',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleCreate}
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
                        <Plus size={18} /> Add
                    </button>
                </div>
            </div>

            {/* Category List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {categories.length > 0 ? categories.map(category => (
                    <div
                        key={category.id}
                        style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(26, 31, 58, 0.3)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            border: '1px solid rgba(42, 47, 74, 0.5)',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: category.color || '#dc4c3e'
                            }} />
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#ffffff'
                            }}>
                                {category.name}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                deleteCategory(category.id);
                                addToast('Category deleted', 'success');
                            }}
                            style={{
                                padding: '0.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: '#9a9a9a',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )) : (
                    <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: '#9a9a9a',
                        background: '#282828',
                        border: '1px solid #3a3a3a',
                        borderRadius: '8px'
                    }}>
                        <p style={{ fontSize: '0.875rem' }}>
                            No categories yet. Create your first one!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
