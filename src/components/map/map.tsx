import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Offer = {
  id: number;
  location: Location;
};

type MapProps = {
  offers: Offer[];
};

const defaultCity = {
  latitude: 52.3909553943508,
  longitude: 4.85309666406198,
  zoom: 12,
};

const markerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function Map({ offers }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [defaultCity.latitude, defaultCity.longitude],
        zoom: defaultCity.zoom,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }

    // Удаляем старые маркеры
    mapInstance.current?.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.current?.removeLayer(layer);
      }
    });

    // Добавляем новые маркеры
    offers.forEach((offer) => {
      L.marker(
        [offer.location.latitude, offer.location.longitude],
        { icon: markerIcon }
      ).addTo(mapInstance.current!);
    });

    // eslint-disable-next-line
  }, [offers]);

  return (
    <section className="cities__map map" ref={mapRef} style={{ height: 850 }} />
  );
}
