'use client';

import React from 'react';
import Map, { NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapStore } from '@/stores/useMapStore';
import { ClimateLayer } from './ClimateLayer';
import { MapControls } from './MapControls';

const MAP_STYLE = {
    version: 8,
    sources: {
        'osm-tiles': {
            type: 'raster',
            tiles: [
                'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
            ],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors, &copy; CARTO'
        }
    },
    layers: [
        {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19
        }
    ]
};

export function IndiaMap() {
    const { viewState, setViewState, layers } = useMapStore();

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-border group">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                // @ts-expect-error: Maplibre StyleSpecification is deeply nested and difficult to cast perfectly
                mapStyle={MAP_STYLE}
                mapLib={maplibregl}
                interactiveLayerIds={['state-fills']} // For future hover/click interactions
            >
                {/* Controls */}
                <NavigationControl position="bottom-right" />
                <ScaleControl position="bottom-left" />

                {/* Climate Raster Overlays */}
                {layers.map(layer => 
                    layer.visible && <ClimateLayer key={layer.id} layer={layer} />
                )}
            </Map>
            
            {/* Custom UI Controls Overlay */}
            <div className="absolute top-4 right-4 z-10 transition-opacity opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                <MapControls />
            </div>
        </div>
    );
}
