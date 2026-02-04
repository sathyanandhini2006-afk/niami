import { Link } from 'react-router-dom';
import { CheckCircle, Lock, Zap } from 'lucide-react';

export const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'transparent', color: '#ffffff' }}>
            {/* Nav */}
            <nav style={{
                borderBottom: '1px solid rgba(42, 47, 74, 0.5)',
                padding: '1rem 2rem',
                background: 'rgba(10, 14, 39, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#dc4c3e'
                    }}>
                        Milo
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" style={{
                            color: '#9a9a9a',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}>
                            Log in
                        </Link>
                        <Link to="/register" style={{
                            background: '#dc4c3e',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}>
                            Start for free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={{
                padding: '5rem 2rem',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h1 className="shimmer-text" style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1'
                }}>
                    Organize your work<br />and life, finally.
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#9a9a9a',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6'
                }}>
                    Become focused, organized, and calm with Milo. The world's #1 task manager and to-do list app.
                </p>
                <Link to="/register" style={{
                    background: '#dc4c3e',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    display: 'inline-block'
                }}>
                    Get started for free
                </Link>
            </section>

            {/* Features */}
            <section style={{
                padding: '4rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {[
                        { icon: <CheckCircle size={32} />, title: 'Clear your mind', desc: 'The fastest way to get tasks out of your head.' },
                        { icon: <Zap size={32} />, title: 'Focus on what matters', desc: 'No more getting distracted by the small stuff.' },
                        { icon: <Lock size={32} />, title: 'Your data is private', desc: 'Everything stays on your device. Always.' }
                    ].map((f, i) => (
                        <div key={i} className="glass-card" style={{
                            padding: '2rem'
                        }}>
                            <div style={{ color: '#dc4c3e', marginBottom: '1rem' }}>
                                {f.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.75rem'
                            }}>
                                {f.title}
                            </h3>
                            <p style={{ color: '#9a9a9a', lineHeight: '1.6' }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid #3a3a3a',
                padding: '2rem',
                textAlign: 'center',
                marginTop: '4rem',
                color: '#9a9a9a',
                fontSize: '0.875rem'
            }}>
                © {new Date().getFullYear()} Milo. All rights reserved.
            </footer>
        </div>
    );
};
