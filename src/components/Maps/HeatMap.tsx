import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L, { HeatLatLngTuple } from 'leaflet';

interface HeatMapProps {
  data: [number, number, number][];
}

const HeatLayer: React.FC<{ data: [number, number, number][] }> = ({ data }) => {
  const map = useMap();

  const normalizedData: HeatLatLngTuple[] = useMemo(() => {
    if (data.length === 0) return [];

    const intensities = data.map(([, , intensity]) => intensity);
    const minIntensity = Math.min(...intensities);
    const maxIntensity = Math.max(...intensities);

    return data.map(([lat, lng, intensity]) => [
      lat,
      lng,
      maxIntensity === minIntensity ? 0 : ((intensity - minIntensity) / (maxIntensity - minIntensity)) * 40,
    ]) as HeatLatLngTuple[];
  }, [data]);

  React.useEffect(() => {
    const heatLayer = L.heatLayer(normalizedData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.0: 'rgba(0, 255, 0, 0.4)',  
        0.3: 'rgba(0, 255, 0, 0.7)',  
        0.5: 'rgba(255, 255, 0, 0.8)', 
        0.7: 'rgba(255, 165, 0, 0.9)', 
        1.0: 'rgba(255, 0, 0, 1.0)',  
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, normalizedData]);

  return null;
};

const DarkModeTileFilter: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const map = useMap();

  useEffect(() => {
    const tilePane = map.getPane('tilePane');
    if (tilePane) {
      tilePane.style.filter = isDark ? 'invert(1) hue-rotate(180deg)' : '';
    }
  }, [isDark, map]);

  return null;
};

const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <MapContainer
      center={[-5.1878, -37.3442]}
      zoom={13}
      style={{ height: '70vh', width: '100%' }}
      scrollWheelZoom={true}
      boxZoom={true}
      doubleClickZoom={true}
      tap={true}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DarkModeTileFilter isDark={isDark} />
      <HeatLayer data={data} />
    </MapContainer>
  );
};

export default HeatMap;
