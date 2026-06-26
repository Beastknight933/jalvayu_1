'use client';

import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { Menu, Bell, User, Settings, Map, Activity, Database, LogOut } from 'lucide-react';
import Link from 'next/link';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { sidebarOpen, toggleSidebar } = useAppStore();
    const { user, logout } = useAuthStore();

    const navigation = [
        { name: 'Digital Twin', href: '/dashboard', icon: Map },
        { name: 'Predictions', href: '/dashboard/predictions', icon: Activity },
        { name: 'Datasets', href: '/dashboard/datasets', icon: Database },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
            >
                <div className="flex h-16 items-center justify-center border-b border-border px-4">
                    <span className="text-xl font-bold tracking-tight text-primary">Climate Twin</span>
                </div>
                
                <nav className="mt-6 flex flex-col gap-2 px-4">
                    {navigation.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation */}
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-accent rounded-md md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <nav className="hidden sm:flex text-sm font-medium text-muted-foreground">
                            <span>Dashboard</span>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">Overview</span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-accent rounded-md relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
                        </button>
                        
                        <div className="flex items-center gap-2 pl-4 border-l border-border">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-medium leading-none">{user?.full_name || 'Scientist'}</span>
                                <span className="text-xs text-muted-foreground mt-1">ISRO Researcher</span>
                            </div>
                            <button className="p-2 hover:bg-accent rounded-md">
                                <User className="w-5 h-5" />
                            </button>
                            <button onClick={logout} className="p-2 hover:bg-accent rounded-md text-destructive">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
