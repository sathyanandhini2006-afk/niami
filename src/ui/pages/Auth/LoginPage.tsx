import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../logic/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const success = await login(data.email, data.password);
        if (success) navigate('/dashboard');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="glass-card" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}>
                <h1 className="shimmer-text" style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem'
                }}>
                    Log in
                </h1>
                <p style={{
                    color: '#9a9a9a',
                    marginBottom: '2rem',
                    fontSize: '0.875rem'
                }}>
                    Welcome back to Milo
                </p>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
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
                            type="email"
                            {...register('email')}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        {errors.email && (
                            <p style={{ color: '#dc4c3e', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '5px',
                                color: '#ffffff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        {errors.password && (
                            <p style={{ color: '#dc4c3e', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: '#dc4c3e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.6 : 1,
                            marginTop: '0.5rem'
                        }}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <div style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: '#9a9a9a'
                }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#dc4c3e', textDecoration: 'none', fontWeight: '600' }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};
