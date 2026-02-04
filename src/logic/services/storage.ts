import type { User, Task, Category, ApiResponse } from '../types';

const DELAY_MS = 500; // Simulate network latency
const STORAGE_KEYS = {
    USERS: 'stm_users',
    TASKS: 'stm_tasks',
    CATEGORIES: 'stm_categories',
    SESSION: 'stm_session',
};

// Helper to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get data from local storage
const getFromStorage = <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Helper to set data to local storage
const setToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const storageService = {
    // Auth & User
    async getUsers(): Promise<User[]> {
        await delay(DELAY_MS);
        return getFromStorage<User>(STORAGE_KEYS.USERS);
    },

    async createUser(user: User): Promise<ApiResponse<User>> {
        await delay(DELAY_MS);
        const users = getFromStorage<User>(STORAGE_KEYS.USERS);
        if (users.find((u) => u.email === user.email)) {
            return { success: false, error: 'Email already exists' };
        }
        const newUser = { ...user, settings: { theme: 'dark', notificationsEnabled: true, defaultReminderTime: 15 } };
        users.push(newUser as User);
        setToStorage(STORAGE_KEYS.USERS, users);
        return { success: true, data: newUser as User };
    },

    async login(email: string, password: string): Promise<ApiResponse<User>> {
        await delay(DELAY_MS);
        const users = getFromStorage<User>(STORAGE_KEYS.USERS);
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }
        // Don't return password
        const { password: _, ...safeUser } = user;
        setToStorage(STORAGE_KEYS.SESSION, safeUser);
        return { success: true, data: safeUser as User };
    },

    async logout(): Promise<void> {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
    },

    async getSession(): Promise<User | null> {
        const session = localStorage.getItem(STORAGE_KEYS.SESSION);
        return session ? JSON.parse(session) : null;
    },

    async updateUser(user: User): Promise<ApiResponse<User>> {
        await delay(DELAY_MS);
        const users = getFromStorage<User>(STORAGE_KEYS.USERS);
        const index = users.findIndex((u) => u.id === user.id);
        if (index === -1) return { success: false, error: 'User not found' };

        users[index] = { ...users[index], ...user };
        setToStorage(STORAGE_KEYS.USERS, users);

        // Update session if it's the current user
        const session = await this.getSession();
        if (session && session.id === user.id) {
            const { password: _, ...safeUser } = users[index];
            setToStorage(STORAGE_KEYS.SESSION, safeUser);
        }

        return { success: true, data: users[index] };
    },

    // Tasks
    async getTasks(userId: string): Promise<Task[]> {
        await delay(DELAY_MS);
        const tasks = getFromStorage<Task>(STORAGE_KEYS.TASKS);
        return tasks.filter((t) => t.userId === userId);
    },

    async createTask(task: Task): Promise<ApiResponse<Task>> {
        await delay(DELAY_MS);
        const tasks = getFromStorage<Task>(STORAGE_KEYS.TASKS);
        tasks.push(task);
        setToStorage(STORAGE_KEYS.TASKS, tasks);
        return { success: true, data: task };
    },

    async updateTask(task: Task): Promise<ApiResponse<Task>> {
        await delay(DELAY_MS);
        const tasks = getFromStorage<Task>(STORAGE_KEYS.TASKS);
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index === -1) return { success: false, error: 'Task not found' };

        tasks[index] = task;
        setToStorage(STORAGE_KEYS.TASKS, tasks);
        return { success: true, data: task };
    },

    async deleteTask(taskId: string): Promise<ApiResponse<void>> {
        await delay(DELAY_MS);
        let tasks = getFromStorage<Task>(STORAGE_KEYS.TASKS);
        tasks = tasks.filter((t) => t.id !== taskId);
        setToStorage(STORAGE_KEYS.TASKS, tasks);
        return { success: true };
    },

    // Categories
    async getCategories(userId: string): Promise<Category[]> {
        await delay(DELAY_MS);
        const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
        // Initialize default categories if none exist for user
        const userCategories = categories.filter((c) => c.userId === userId);
        if (userCategories.length === 0) {
            const defaults: Category[] = [
                { id: crypto.randomUUID(), userId, name: 'Personal', color: '#3b82f6' },
                { id: crypto.randomUUID(), userId, name: 'Work', color: '#ef4444' },
                { id: crypto.randomUUID(), userId, name: 'Shopping', color: '#10b981' }
            ];
            categories.push(...defaults);
            setToStorage(STORAGE_KEYS.CATEGORIES, categories);
            return defaults;
        }
        return userCategories;
    },

    async createCategory(category: Category): Promise<ApiResponse<Category>> {
        await delay(DELAY_MS);
        const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
        categories.push(category);
        setToStorage(STORAGE_KEYS.CATEGORIES, categories);
        return { success: true, data: category };
    },

    async deleteCategory(categoryId: string): Promise<ApiResponse<void>> {
        await delay(DELAY_MS);
        let categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
        categories = categories.filter(c => c.id !== categoryId);
        setToStorage(STORAGE_KEYS.CATEGORIES, categories);
        return { success: true };
    }
};
