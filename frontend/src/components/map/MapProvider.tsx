'use client';

import React from 'react';
import { MapProvider as RMapProvider } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

export function MapProvider({ children }: { children: React.ReactNode }) {
    return (
        <RMapProvider>
            {children}
        </RMapProvider>
    );
}
