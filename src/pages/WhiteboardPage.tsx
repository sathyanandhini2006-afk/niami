import { useRef, useState, useEffect } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const WhiteboardPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#dc4c3e');
    const [lineWidth, setLineWidth] = useState(3);
    const { addToast } = useToast();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            contextRef.current = ctx;
        }
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = contextRef.current;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = contextRef.current;
        if (ctx) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            addToast('Canvas cleared', 'info');
        }
    };

    const exportImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = `whiteboard-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            addToast('Exported successfully', 'success');
        }
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '3rem 1.5rem',
            height: 'calc(100vh - 120px)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}>
                    Whiteboard
                </h1>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Color Picker */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['#dc4c3e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ffffff'].map(c => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '5px',
                                    background: c,
                                    border: color === c ? '2px solid #ffffff' : '1px solid #3a3a3a',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>

                    {/* Line Width */}
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(Number(e.target.value))}
                        style={{
                            width: '100px',
                            accentColor: '#dc4c3e'
                        }}
                    />

                    <button
                        onClick={clearCanvas}
                        style={{
                            padding: '0.75rem 1rem',
                            background: '#282828',
                            border: '1px solid #3a3a3a',
                            borderRadius: '5px',
                            color: '#9a9a9a',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Trash2 size={16} /> Clear
                    </button>

                    <button
                        onClick={exportImage}
                        style={{
                            padding: '0.75rem 1rem',
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
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                    width: '100%',
                    height: 'calc(100% - 80px)',
                    background: '#282828',
                    border: '1px solid #3a3a3a',
                    borderRadius: '8px',
                    cursor: 'crosshair'
                }}
            />
        </div>
    );
};
