import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { OfferData } from '../offer-list/offer-list';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type MapProps = {
  offers: OfferData[];
  activeOfferId?: string | null;
};

const defaultCity: Location = {
  latitude: 48.8566,
  longitude: 2.3522,
  zoom: 0,
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
  // Явно указываем тип Location
  const cityLocation: Location = offers.length > 0 ? offers[0].location : defaultCity;
  const mapInstance = useMap(mapRef, { location: cityLocation, zoom: cityLocation.zoom });

  useEffect(() => {
    if (mapInstance) {
      mapInstance.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom
      );
    }
  }, [mapInstance, cityLocation]);

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    mapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer);
      }
    });

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
