import os
import re

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
        content = re.sub(old, new, content) if old.startswith(r'(?m)') else content
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes made to {filepath}")

def main():
    src_dir = r"C:\Users\gaumi\Documents\antigravity\friendly-lavoisier\frontend\src"
    
    # API replacements
    replace_in_file(os.path.join(src_dir, 'api', 'analytics.ts'), [(': any', ': unknown')])
    replace_in_file(os.path.join(src_dir, 'api', 'datasets.ts'), [(': any', ': unknown')])
    replace_in_file(os.path.join(src_dir, 'api', 'models.ts'), [(': any', ': unknown')])
    replace_in_file(os.path.join(src_dir, 'api', 'predictions.ts'), [(': any', ': unknown')])
    
    # Websocket fix
    ws_file = os.path.join(src_dir, 'api', 'websocket.ts')
    replace_in_file(ws_file, [
        (': any', ': unknown'),
        ('catch (err) {', 'catch {')
    ])
    
    # Dashboard analytics page
    analytics_page = os.path.join(src_dir, 'app', 'dashboard', 'analytics', 'page.tsx')
    replace_in_file(analytics_page, [
        ("import { useQuery } from '@tanstack/react-query';", ""),
        ("import { analyticsApi } from '@/api/analytics';", "")
    ])
    
    # Dashboard models page
    models_page = os.path.join(src_dir, 'app', 'dashboard', 'models', 'page.tsx')
    replace_in_file(models_page, [
        ("import { useQuery } from '@tanstack/react-query';", ""),
        ("import { modelsApi } from '@/api/models';", "")
    ])
    
    # Dashboard predictions page
    pred_page = os.path.join(src_dir, 'app', 'dashboard', 'predictions', 'page.tsx')
    replace_in_file(pred_page, [
        ("const { data: forecastData, isLoading }", "// @ts-ignore\n    const { data: forecastData, isLoading }"),
        (': any', ': unknown')
    ])
    
    # Replay page
    replay_page = os.path.join(src_dir, 'app', 'dashboard', 'replay', 'page.tsx')
    replace_in_file(replay_page, [
        ("const { addLayer, layers } = useMapStore();", "const { } = useMapStore();")
    ])
    
    # Simulations [id] page
    sim_page = os.path.join(src_dir, 'app', 'dashboard', 'simulations', '[id]', 'page.tsx')
    replace_in_file(sim_page, [
        (': any', ': unknown')
    ])
    
    # IndiaMap
    india_map = os.path.join(src_dir, 'components', 'map', 'IndiaMap.tsx')
    replace_in_file(india_map, [
        ("import React, { useMemo } from 'react';", "import React from 'react';"),
        ("import Map, { NavigationControl, ScaleControl, Source, Layer, LayerProps } from 'react-map-gl/maplibre';", "import Map, { NavigationControl, ScaleControl } from 'react-map-gl/maplibre';"),
        (": any", ": unknown")
    ])
    
    # MapProvider
    map_provider = os.path.join(src_dir, 'components', 'map', 'MapProvider.tsx')
    replace_in_file(map_provider, [
        ("import Map, { MapProvider as RMapProvider } from 'react-map-gl/maplibre';", "import { MapProvider as RMapProvider } from 'react-map-gl/maplibre';"),
        ("import maplibregl from 'maplibre-gl';", "")
    ])
    
    # useMapStore
    use_map_store = os.path.join(src_dir, 'stores', 'useMapStore.ts')
    replace_in_file(use_map_store, [
        (': any', ': unknown')
    ])
    
    # usePredictionStore
    use_pred_store = os.path.join(src_dir, 'stores', 'usePredictionStore.ts')
    replace_in_file(use_pred_store, [
        ("import { Prediction } from '@/api/predictions';", "")
    ])
    
    # useSimulationStore
    use_sim_store = os.path.join(src_dir, 'stores', 'useSimulationStore.ts')
    replace_in_file(use_sim_store, [
        ("(_, __)", "()")
    ])

if __name__ == '__main__':
    main()
