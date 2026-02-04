import { useForm } from 'react-hook-form';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../logic/context/AuthContext';
import { useToast } from '../../logic/context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
        }
    });

    const onSubmit = async (data: any) => {
        if (!user) return;
        updateUser({
            ...user,
            name: data.name,
        });
        addToast('Profile updated', 'success');
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
                Profile Settings
            </h1>

            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem',
                marginBottom: '1.5rem'
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            Full Name
                        </label>
                        <input
                            {...register('name')}
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

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            Email
                        </label>
                        <input
                            {...register('email')}
                            disabled
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#1f1f1f',
                                border: '1px solid #3a3a3a',
                                borderRadius: '5px',
                                color: '#9a9a9a',
                                fontSize: '1rem',
                                outline: 'none',
                                cursor: 'not-allowed'
                            }}
                        />
                    </div>

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
                </form>
            </div>

            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem'
            }}>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '1rem'
                }}>
                    Account Actions
                </h3>
                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        border: '1px solid #dc4c3e',
                        borderRadius: '5px',
                        color: '#dc4c3e',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </div>
        </div>
    );
};
