import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <div style={{
            minHeight: 'calc(100vh - 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    color: '#dc4c3e',
                    marginBottom: '1rem'
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '0.5rem'
                }}>
                    Page Not Found
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#9a9a9a',
                    marginBottom: '2rem'
                }}>
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/dashboard"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: '#dc4c3e',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                    }}
                >
                    <Home size={18} /> Go Home
                </Link>
            </div>
        </div>
    );
};
