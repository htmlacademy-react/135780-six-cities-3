import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Offer = {
  id: string;
  location: Location;
};

export type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
};

const defaultCity: Location = {
  latitude: 52.3909553943508,
  longitude: 4.85309666406198,
  zoom: 12,
};

const markerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const activeMarkerIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function Map({ offers, activeOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useMap(mapRef, { location: defaultCity, zoom: defaultCity.zoom });

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    // Удаляем только маркеры (оставляем базовый слой)
    mapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer);
      }
    });

    // Добавляем маркеры с условной подсветкой
    offers.forEach((offer) => {
      const isActive = offer.id.toString() === activeOfferId?.toString();
      L.marker(
        [offer.location.latitude, offer.location.longitude],
        { icon: isActive ? activeMarkerIcon : markerIcon }
      ).addTo(mapInstance);
    });
  }, [offers, mapInstance, activeOfferId]);

  return (
    <section className="cities__map map" ref={mapRef} style={{ height: 850 }} />
  );
}
