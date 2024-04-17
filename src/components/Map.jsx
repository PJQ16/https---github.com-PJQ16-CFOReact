import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function Map({ latitude, longitude, detail, setLatitude, setLongitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBneyeBMWC910_H1sLEKGGlLSr894Tm1iY"
  });

  const [markerPosition, setMarkerPosition] = useState({ lat: latitude, lng: longitude });

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px', borderRadius: '20px' }}
      center={markerPosition}
      zoom={12}
      
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
      >
        <InfoWindow position={markerPosition}>
          <div>
            <p>{detail}</p>
            <p>Latitude: {markerPosition.lat}</p>
            <p>Longitude: {markerPosition.lng}</p>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);
