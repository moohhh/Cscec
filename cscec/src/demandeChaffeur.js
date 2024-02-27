import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, Autocomplete } from '@react-google-maps/api';
import Navbar from './component/navbarconnecter';

function DemandeChauffeur() {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setCurrentLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '60vw', height: '80vh' }} className='map'>
        <LoadScript
          googleMapsApiKey="AIzaSyAcVQEnXKjrGME7PVJwdXRz_n4RTeAkNuE"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 48.8566, lng: 2.3522 }}
            zoom={8}
            onLoad={onLoad}
          >
            {currentLocation && (
              <Marker position={currentLocation} title="Ma Localisation" />
            )}
            {destination && (
              <Marker position={destination} title="Destination" />
            )}

            {map && (
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter your current location"
                  style={{ ...inputStyle, top: '10px', left: '50%' }}
                />
              </Autocomplete>
            )}

            <input
              type="text"
              placeholder="Enter your destination"
              value={destination ? destination.address : ''}
              onChange={handleDestinationChange}
              style={{ ...inputStyle, top: '50px', left: '50%' }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

const inputStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "absolute",
  marginLeft: "-120px",
  marginTop: "10px",
  zIndex: 1000,
};

export default DemandeChauffeur;
