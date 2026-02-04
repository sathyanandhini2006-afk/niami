import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Task, Category } from '../types';
import { storageService } from '../services/storage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface TaskContextType {
    tasks: Task[];
    categories: Category[];
    loading: boolean;
    createTask: (task: Partial<Task>) => Promise<boolean>;
    updateTask: (taskId: string, task: Partial<Task>) => Promise<boolean>;
    deleteTask: (taskId: string) => Promise<boolean>;
    toggleTaskStatus: (task: Task) => Promise<boolean>;
    createCategory: (category: { name: string; color: string }) => Promise<boolean>;
    deleteCategory: (id: string) => Promise<boolean>;
    refreshTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!user) {
            setTasks([]);
            setCategories([]);
            return;
        }
        setLoading(true);
        try {
            const [fetchedTasks, fetchedCategories] = await Promise.all([
                storageService.getTasks(user.id),
                storageService.getCategories(user.id)
            ]);
            setTasks(fetchedTasks);
            setCategories(fetchedCategories);
        } catch (err) {
            console.error(err);
            addToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    }, [user, addToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refreshTasks = () => fetchData();

    const createTask = async (taskData: Partial<Task>) => {
        if (!user) return false;
        try {
            const newTask: Task = {
                id: crypto.randomUUID(),
                userId: user.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'pending' as const,
                priority: (taskData.priority || 'medium') as 'low' | 'medium' | 'high',
                title: taskData.title || 'Untitled',
                description: taskData.description || '',
                dueDate: taskData.dueDate || new Date().toISOString(),
                ...taskData
            };
            const res = await storageService.createTask(newTask);
            if (res.success) {
                setTasks(prev => [...prev, newTask]);
                addToast('Task created', 'success');
                return true;
            }
            return false;
        } catch (err) {
            addToast('Failed to create task', 'error');
            return false;
        }
    };

    const updateTask = async (taskId: string, updates: Partial<Task>) => {
        try {
            const currentTask = tasks.find(t => t.id === taskId);
            if (!currentTask) return false;

            const updated: Task = { ...currentTask, ...updates, updatedAt: new Date().toISOString() };
            const res = await storageService.updateTask(updated);
            if (res.success) {
                setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
                return true;
            }
            return false;
        } catch (err) {
            addToast('Failed to update task', 'error');
            return false;
        }
    };

    const toggleTaskStatus = async (task: Task) => {
        const newStatus = (task.status === 'completed' ? 'pending' : 'completed') as Task['status'];
        const updated: Task = { ...task, status: newStatus, updatedAt: new Date().toISOString() };
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === task.id ? updated : t));

        const res = await storageService.updateTask(updated);
        if (!res.success) {
            // Revert if failed
            setTasks(prev => prev.map(t => t.id === task.id ? task : t));
            addToast('Failed to update task status', 'error');
            return false;
        }
        if (newStatus === 'completed') {
            addToast('Task completed!', 'success');
        }
        return true;
    };

    const deleteTask = async (taskId: string) => {
        try {
            const res = await storageService.deleteTask(taskId);
            if (res.success) {
                setTasks(prev => prev.filter(t => t.id !== taskId));
                addToast('Task deleted', 'info');
                return true;
            }
            return false;
        } catch (err) {
            addToast('Failed to delete task', 'error');
            return false;
        }
    };

    const createCategory = async ({ name, color }: { name: string; color: string }) => {
        if (!user) return false;
        const newCat: Category = {
            id: crypto.randomUUID(),
            userId: user.id,
            name,
            color
        };
        const res = await storageService.createCategory(newCat);
        if (res.success) {
            setCategories(prev => [...prev, newCat]);
            addToast('Category created', 'success');
            return true;
        }
        return false;
    };

    const deleteCategory = async (id: string) => {
        // Check if used
        if (tasks.some(t => t.categoryId === id)) {
            addToast('Cannot delete category with active tasks', 'warning');
            return false;
        }
        const res = await storageService.deleteCategory(id);
        if (res.success) {
            setCategories(prev => prev.filter(c => c.id !== id));
            addToast('Category deleted', 'info');
            return true;
        }
        return false;
    };

    return (
        <TaskContext.Provider value={{
            tasks, categories, loading,
            createTask, updateTask, deleteTask, toggleTaskStatus,
            createCategory, deleteCategory, refreshTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
