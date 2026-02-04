import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, HelpCircle, LayoutDashboard, ListTodo, Calendar, BarChart2, Edit3 } from 'lucide-react';
import { useAuth } from '../../../logic/context/AuthContext';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Tasks', path: '/tasks', icon: ListTodo },
        { label: 'Calendar', path: '/calendar', icon: Calendar },
        { label: 'Analytics', path: '/analytics', icon: BarChart2 },
        { label: 'Whiteboard', path: '/whiteboard', icon: Edit3 },
    ];

    return (
        <>
            <style>
                {`
                    @media (max-width: 768px) {
                        .nav-desktop { display: none !important; }
                        .nav-mobile-toggle { display: flex !important; }
                    }
                    @media (min-width: 769px) {
                        .nav-desktop { display: flex !important; }
                        .nav-mobile-toggle { display: none !important; }
                        .nav-mobile-menu { display: none !important; }
                    }
                    @media (max-width: 480px) {
                        .user-name { display: none !important; }
                    }
                `}
            </style>
            <nav className="glass-nav" style={{
                height: '60px',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    height: '100%',
                    padding: '0 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* Logo */}
                    <Link to="/dashboard" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#dc4c3e',
                        textDecoration: 'none'
                    }}>
                        Milo
                    </Link>

                    {/* Navbar Items */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}>
                        <div className="nav-desktop" style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: location.pathname === item.path ? '#ffffff' : '#9a9a9a',
                                        background: location.pathname === item.path ? 'rgba(26, 31, 58, 0.8)' : 'transparent'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="nav-mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem',
                                background: 'rgba(26, 31, 58, 0.8)',
                                border: '1px solid rgba(42, 47, 74, 0.5)',
                                borderRadius: '5px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                marginRight: '0.5rem'
                            }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        {/* Profile Dropdown */}
                        <div ref={profileRef} style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(26, 31, 58, 0.8)',
                                    border: '1px solid rgba(42, 47, 74, 0.5)',
                                    borderRadius: '5px',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <User size={16} />
                                <span className="user-name">
                                    {user?.name.split(' ')[0]}
                                </span>
                            </button>

                            {isProfileOpen && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 'calc(100% + 0.5rem)',
                                    width: '200px',
                                    background: 'rgba(26, 31, 58, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(42, 47, 74, 0.5)',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                                }}>
                                    <button
                                        onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ffffff',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <Settings size={16} /> Settings
                                    </button>
                                    <button
                                        onClick={() => { navigate('/help'); setIsProfileOpen(false); }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ffffff',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <HelpCircle size={16} /> Help
                                    </button>
                                    <div style={{ height: '1px', background: 'rgba(42, 47, 74, 0.5)', margin: '0.5rem 0' }} />
                                    <button
                                        onClick={() => logout()}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#dc4c3e',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <LogOut size={16} /> Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="nav-mobile-menu" style={{
                        position: 'fixed',
                        top: '60px',
                        left: 0,
                        right: 0,
                        background: 'rgba(10, 14, 39, 0.98)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(42, 47, 74, 0.5)',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        zIndex: 99
                    }}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: location.pathname === item.path ? '#ffffff' : '#9a9a9a',
                                        background: location.pathname === item.path ? 'rgba(26, 31, 58, 0.8)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <Icon size={18} /> {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        </>
    );
};
