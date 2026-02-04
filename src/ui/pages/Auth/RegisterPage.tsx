import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../logic/context/AuthContext';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        const success = await registerUser(data);
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
                maxWidth: '450px',
                padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}>
                <h1 className="shimmer-text" style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem'
                }}>
                    Sign up
                </h1>
                <p style={{
                    color: '#9a9a9a',
                    marginBottom: '2rem',
                    fontSize: '0.875rem'
                }}>
                    Join millions of people who organize work and life with Milo
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
                            Name
                        </label>
                        <input
                            type="text"
                            {...register('name')}
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
                        {errors.name && (
                            <p style={{ color: '#dc4c3e', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                {errors.name.message}
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

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            marginBottom: '0.5rem'
                        }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
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
                        {errors.confirmPassword && (
                            <p style={{ color: '#dc4c3e', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                {errors.confirmPassword.message}
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
                        {isSubmitting ? 'Creating account...' : 'Sign up'}
                    </button>
                </form>

                <div style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: '#9a9a9a'
                }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#dc4c3e', textDecoration: 'none', fontWeight: '600' }}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};
