"use client";

import { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css"; // this line is needed to import the leaflet css file (otherwise the map will not be displayed)
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; // this line is needed to fix the issue with the marker icon not showing up
// This is the default marker icon for the map
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Create custom icon for the map marker
const locationIcon = L.icon({
  iconUrl: L.Icon.Default.prototype.options?.iconUrl || "", // this is the URL of the icon image
  iconRetinaUrl: L.Icon.Default.prototype.options?.iconRetinaUrl || "", // this is the URL of the retina icon image (used for high resolution displays)
  shadowUrl: L.Icon.Default.prototype.options?.shadowUrl || "", // this is the URL of the shadow image
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  tooltipAnchor: [16, -28],
});

interface MapProps {
  center?: (number | undefined)[] | null;
}

const Map: FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2} // the zoom level of the map
      scrollWheelZoom={false} // disable zooming with the scroll wheel
      className="h-[35vh] rounded-lg"
    >
      {/* Map image */}
      <TileLayer
        // Copyright
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // this is the attribution that is required by OpenStreetMap (to prevent violating their terms of service)
        // Link of entire map
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // this is the URL of the map tiles
      />
      {center && (
        <Marker position={center as L.LatLngExpression} icon={locationIcon} />
      )}
    </MapContainer>
  );
};

export default Map;
