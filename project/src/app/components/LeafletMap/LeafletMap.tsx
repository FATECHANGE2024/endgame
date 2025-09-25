// const statusIcons = {
//                 new: new L.Icon({
//                     ...baseIconOptions,
//                     iconUrl: '/images/markers/marker-icon-2x-orange.png',
//                 }),
//                 progress: new L.Icon({
//                     ...baseIconOptions,
//                     iconUrl: '/images/markers/marker-icon-2x-blue.png',
//                 }),
//                 resolved: new L.Icon({
//                     ...baseIconOptions,
//                     iconUrl: '/images/markers/marker-icon-2x-green.png',
//                 }),
//             };

// components/LeafletMap.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure Leaflet CSS is imported

// Fix default icon issue with Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const LeafletMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove(); // Clean up existing map instance if it exists
    }

    // Initialize map
    const map = L.map('leaflet-map').setView([23.2599, 77.4126], 13); // Centered on Bhopal
    mapRef.current = map; // Store map instance in ref

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Sample issue data
    const issues = [
      { lat: 23.254, lng: 77.422, status: 'new', title: 'Large Pothole', desc: 'Hoshangabad Road' },
      { lat: 23.245, lng: 77.435, status: 'progress', title: 'Broken Streetlight', desc: 'MP Nagar' },
      { lat: 23.265, lng: 77.401, status: 'resolved', title: 'Graffiti Cleaned', desc: 'TT Nagar Park' },
      { lat: 23.275, lng: 77.442, status: 'new', title: 'Garbage Dump', desc: 'Near Ashoka Garden' },
      { lat: 23.230, lng: 77.390, status: 'progress', title: 'Water Pipe Leakage', desc: 'Arera Colony' }
    ];

    // Custom icon definitions
    const baseIconOptions = L.Icon.extend({
      options: {
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      }
    });

    // Using rawgit for CDN might be unreliable, consider hosting these yourself or using Leaflet's default color markers if available
    // For demonstration, these URLs are kept but be mindful of CDN stability
    // const newIcon = new iconBase({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png' });
    // const progressIcon = new iconBase({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png' });
    // const resolvedIcon = new iconBase({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png' });

    const statusIcons: { [key: string]: L.Icon }  = {
                new: new L.Icon({
                    ...baseIconOptions,
                    iconUrl: '/images/markers/marker-icon-2x-orange.png',
                }),
                progress: new L.Icon({
                    ...baseIconOptions,
                    iconUrl: '/images/markers/marker-icon-2x-blue.png',
                }),
                resolved: new L.Icon({
                    ...baseIconOptions,
                    iconUrl: '/images/markers/marker-icon-2x-green.png',
                }),
            };


    // const statusIcons: { [key: string]: L.Icon } = {
    //   new: newIcon,
    //   progress: progressIcon,
    //   resolved: resolvedIcon
    // };

    // Add markers to map
    issues.forEach(issue => {
      L.marker([issue.lat, issue.lng], { icon: statusIcons[issue.status] })
       .addTo(map)
       .bindPopup(`<b>${issue.title}</b><br>${issue.desc}`);
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div id="leaflet-map" style={{ height: '500px', width: '100%' }}></div>;
};

export default LeafletMap;
