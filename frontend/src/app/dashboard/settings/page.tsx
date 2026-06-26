'use client';

import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const { user } = useAuthStore();
    const { theme, setTheme } = useTheme();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 max-w-4xl"
        >
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-lg">Profile Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">Update your account details.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                        <input 
                            type="text" 
                            disabled 
                            value={user?.full_name || 'ISRO Scientist'} 
                            className="w-full max-w-md bg-secondary border border-border rounded-md px-4 py-2 text-muted-foreground cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                        <input 
                            type="email" 
                            disabled 
                            value={user?.email || 'scientist@isro.gov.in'} 
                            className="w-full max-w-md bg-secondary border border-border rounded-md px-4 py-2 text-muted-foreground cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-lg">Preferences</h3>
                    <p className="text-sm text-muted-foreground mt-1">Customize your Digital Twin experience.</p>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Theme</label>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setTheme('light')}
                                className={`px-4 py-2 rounded-md text-sm font-medium border ${theme === 'light' ? 'border-primary text-primary bg-primary/10' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}
                            >
                                Light
                            </button>
                            <button 
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-2 rounded-md text-sm font-medium border ${theme === 'dark' ? 'border-primary text-primary bg-primary/10' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}
                            >
                                Premium Dark
                            </button>
                            <button 
                                onClick={() => setTheme('system')}
                                className={`px-4 py-2 rounded-md text-sm font-medium border ${theme === 'system' ? 'border-primary text-primary bg-primary/10' : 'border-border bg-card text-muted-foreground hover:bg-accent'}`}
                            >
                                System
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
