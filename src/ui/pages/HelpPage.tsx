import { HelpCircle, Mail } from 'lucide-react';

export const HelpPage = () => {
    const faqs = [
        {
            q: 'How do I create a task?',
            a: 'Click the "Add Task" button on the dashboard or task list page, fill in the details, and click "Add Task".'
        },
        {
            q: 'Can I set priorities for tasks?',
            a: 'Yes! When creating or editing a task, you can set the priority to Low, Medium, or High.'
        },
        {
            q: 'Is my data stored online?',
            a: 'No. All your data is stored locally in your browser. Nothing is sent to any server.'
        },
        {
            q: 'How do I delete a task?',
            a: 'Open the task details page and click the "Delete" button.'
        }
    ];

    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem 1.5rem'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '2rem'
            }}>
                Help & Support
            </h1>

            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <HelpCircle size={20} /> Frequently Asked Questions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {faqs.map((faq, i) => (
                        <div key={i}>
                            <h3 style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#ffffff',
                                marginBottom: '0.5rem'
                            }}>
                                {faq.q}
                            </h3>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#9a9a9a',
                                lineHeight: '1.6'
                            }}>
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                background: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <Mail size={32} style={{ color: '#dc4c3e', margin: '0 auto 1rem' }} />
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.5rem'
                }}>
                    Need More Help?
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#9a9a9a',
                    marginBottom: '1.5rem'
                }}>
                    Contact us at support@milo.app
                </p>
                <a
                    href="mailto:support@milo.app"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#dc4c3e',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'inline-block'
                    }}
                >
                    Contact Support
                </a>
            </div>
        </div>
    );
};
