import { memo, useEffect, useRef, useState } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  MarkerF,
} from '@react-google-maps/api';
import { usePosition } from 'use-position';
import styled from 'styled-components';
import PLACES from './placeData';

// 경로 나타내기
const Directions = ({ origin, destination }) => {
  const [directions, setDirections] = useState();
  const [arrive, setArrive] = useState('');
  const [duration, setDuration] = useState('');
  const [address, setAddress] = useState('');
  const count = useRef(0);
  const options = {
    polylineOptions: {
      strokeColor: '#FB4357',
      strokeWeight: 6,
      strokeOpacity: 0.8,
    },
  };

  useEffect(() => {
    count.current = 0;
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

  const directionsCallback = (result, status) => {
    if (status === 'OK' && count.current === 0) {
      count.current += 1;
      setDirections(result);
      setArrive(result.routes[0].legs[0].arrival_time.text);
      setDuration(result.routes[0].legs[0].duration.text);
      setAddress(result.routes[0].legs[0].end_address);
    }
  };
  const endAdrress = address.split(' ').splice(1).join(' ');

  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: 'TRANSIT',
        }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options} />
      <MarkerF
        position={destination}
        icon={{
          url: 'images/minipopcorn.png',
          scale: 1,
        }}
      />
      <MapInfo>
        <MapInfoContent>도착 예정시간: {arrive}</MapInfoContent>
        <MapInfoContent>소요 시간: {duration}</MapInfoContent>
        <MapInfoContent>위치: {endAdrress}</MapInfoContent>
      </MapInfo>
    </>
  );
};

const Map = () => {
  // 현재 위치 출력
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [currentZoom, setCurrentZoom] = useState(2);
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude && !error) {
      setCurrentPosition({ lat: latitude, lng: longitude });
      setCurrentZoom(18);
    }
  }, [latitude, longitude, error]);
  const startPoint = currentPosition;
  const endPoint = { lat: PLACES[1].lat, lng: PLACES[1].lng };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOGGLE_API_KEY}>
      <GoogleMap
        className="googlemap"
        mapContainerStyle={{ height: '300px', width: '950px' }}
        zoom={16}
        center={startPoint ? currentPosition : undefined}
      >
        <Directions origin={startPoint} destination={endPoint} />
      </GoogleMap>
    </LoadScript>
  );
};

const MapInfo = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 950px;
  height: 50px;
  top: 0px;
  background-color: #fff;
`;
const MapInfoContent = styled.span`
  width: 310px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 15px;
  text-align: center;
  letter-spacing: 0.5px;
  border-radius: 12px;
  background-color: #fb4357;
  top: 0;
`;

export default memo(Map);
