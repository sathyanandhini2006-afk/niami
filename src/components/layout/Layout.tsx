import React from 'react';
import { Navbar } from './Navbar';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000000',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '3rem',
                    height: '3rem',
                    border: '3px solid rgba(220, 76, 62, 0.2)',
                    borderTop: '3px solid #dc4c3e',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <p style={{
                    color: '#9a9a9a',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: 'bold'
                }}>
                    Milo is loading...
                </p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            color: '#ffffff'
        }}>
            <Navbar />
            <main style={{
                flex: 1,
                paddingTop: '2rem',
                paddingBottom: '4rem'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1.5rem'
                }}>
                    {children}
                </div>
            </main>

            <footer style={{
                padding: '2rem 0',
                borderTop: '1px solid rgba(42, 47, 74, 0.3)',
                marginTop: 'auto'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.625rem',
                    color: '#9a9a9a',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em'
                }}>
                    &copy; {new Date().getFullYear()} Milo &bull; Simple & Premium
                </div>
            </footer>
        </div>
    );
};
