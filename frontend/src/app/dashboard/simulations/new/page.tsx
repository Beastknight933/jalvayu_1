'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScenarioForm } from '@/components/simulator/ScenarioForm';

export default function NewSimulationPage() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 max-w-4xl mx-auto h-full"
        >
            <ScenarioForm />
        </motion.div>
    );
}
