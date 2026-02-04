import { useState } from 'react';
import { Lock, ShieldCheck, ChevronRight, Hash, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../../logic/context/AuthContext';
import { useToast } from '../../../logic/context/ToastContext';

interface EmojiLockProps {
    mode: 'set' | 'unlock';
    onSuccess?: () => void;
    onCancel?: () => void;
}

const EMOJI_LIST = ['⚡', '🔥', '💎', '🚀', '🌈', '🍕', '🐱', '🦄', '🔒', '🍎', '⭐', '🎈'];

export const EmojiLock = ({ mode, onSuccess, onCancel }: EmojiLockProps) => {
    const { user, setEmojiPassword, setLocked } = useAuth();
    const { addToast } = useToast();
    const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
    const [confirmMode, setConfirmMode] = useState(false);
    const [firstSequence, setFirstSequence] = useState<string[]>([]);
    const [error, setError] = useState(false);

    const handleEmojiClick = (emoji: string) => {
        if (selectedEmojis.length >= 6) return;
        setSelectedEmojis([...selectedEmojis, emoji]);
    };

    const clearSelection = () => {
        setSelectedEmojis([]);
        setError(false);
    };

    const handleSubmit = async () => {
        if (mode === 'set') {
            if (selectedEmojis.length < 3) {
                addToast('Select at least 3 indicators', 'info');
                return;
            }

            if (!confirmMode) {
                setFirstSequence(selectedEmojis);
                setSelectedEmojis([]);
                setConfirmMode(true);
                addToast('Verify your sequence', 'info');
            } else {
                if (JSON.stringify(firstSequence) === JSON.stringify(selectedEmojis)) {
                    const success = await setEmojiPassword(selectedEmojis);
                    if (success) {
                        onSuccess?.();
                    }
                } else {
                    addToast('Sequence mismatch', 'error');
                    setConfirmMode(false);
                    setSelectedEmojis([]);
                }
            }
        } else {
            // Unlock mode
            if (JSON.stringify(user?.emojiPassword) === JSON.stringify(selectedEmojis)) {
                setLocked(false);
                addToast('Unlocked', 'success');
                onSuccess?.();
            } else {
                setError(true);
                setSelectedEmojis([]);
                addToast('Invalid sequence', 'error');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] animate-in">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-30" />

            <div className="w-full max-w-sm p-8 space-y-10 relative z-10 bg-white/[0.02] rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 ring-1 ring-white/10">
                        {mode === 'unlock' ? <Lock size={28} /> : <ShieldCheck size={28} />}
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            {mode === 'set'
                                ? (confirmMode ? 'Verify Sequence' : 'Set Lock')
                                : 'Milo is Locked'}
                        </h2>
                        <p className="text-muted text-xs font-medium">
                            {mode === 'set'
                                ? 'Pick a combination of 3-6 emojis'
                                : 'Enter your pattern to continue'}
                        </p>
                    </div>
                </div>

                {/* Display Current Selection */}
                <div className={`flex justify-center gap-3 h-16 items-center bg-black/40 rounded-2xl border transition-all duration-300 ${error ? 'border-red-500/50' : 'border-white/5'}`}>
                    {selectedEmojis.length === 0 ? (
                        <div className="flex items-center gap-2 opacity-20">
                            <span className="text-muted text-[10px] uppercase font-bold tracking-[0.2em]">Select Pattern</span>
                        </div>
                    ) : (
                        selectedEmojis.map((emoji, i) => (
                            <div key={i} className="text-2xl transition-transform hover:scale-125 cursor-default">{emoji}</div>
                        ))
                    )}
                </div>

                {/* Emoji Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {EMOJI_LIST.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => handleEmojiClick(emoji)}
                            className="h-14 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary hover:bg-primary/10 transition-all text-2xl flex items-center justify-center active:scale-90"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    <Button variant="royal" className="w-full h-14 rounded-2xl" onClick={handleSubmit} disabled={selectedEmojis.length < (mode === 'set' ? 3 : 1)}>
                        {mode === 'set' ? 'Confirm' : 'Unlock Now'} <ChevronRight size={18} className="ml-2" />
                    </Button>

                    <div className="flex justify-between items-center px-2">
                        <button onClick={clearSelection} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
                            <RotateCcw size={12} /> Reset
                        </button>
                        {onCancel && (
                            <button onClick={onCancel} className="text-[10px] font-bold uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
