import React from 'react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-foreground">Climate Digital Twin</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Sign in to your enterprise account</p>
                </div>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-input rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="scientist@isro.gov.in"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-background border border-input rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>
                    <button 
                        type="button"
                        className="w-full bg-primary text-primary-foreground font-medium py-2 rounded-md hover:bg-primary/90 transition-colors mt-4"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
