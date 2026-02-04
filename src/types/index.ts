export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'completed';

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // stored for mock auth
    emojiPassword?: string[]; // Array of emojis
    settings?: UserSettings;
}

export interface UserSettings {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
    defaultReminderTime: number; // minutes before
}

export interface Category {
    id: string;
    userId: string;
    name: string;
    color: string;
}

export interface Task {
    id: string;
    userId: string;
    title: string;
    description?: string;
    dueDate: string; // ISO string
    dueTime?: string;
    priority: Priority;
    status: Status;
    categoryId?: string;
    reminder?: boolean;
    reminderTime?: string;
    isRecurring?: boolean;
    recurringFrequency?: 'daily' | 'weekly' | 'monthly';
    eventType?: 'task' | 'meeting' | 'appointment' | 'birthday';
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
