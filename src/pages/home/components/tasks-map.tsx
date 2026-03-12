import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { useMemo, useRef, useState } from 'react';
import { CircleIcon } from '../icons/circle-icon';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '300px',
};

const mapOptions = {
  styles: [
    {
      elementType: 'geometry',
      stylers: [{ color: '#2a3a7d' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#2a3a7d' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d0d4f7' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#475c9e' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#a3a7c2' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#1a213b' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#2a3a7d' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
  disableDefaultUI: true,
  mapTypeId: 'roadmap',
};

const center = { lat: 25.276987, lng: 55.696249 };
const defaultZoom = 9;

export const TasksMap = ({ courts }: any) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const heatmapData = useMemo(() => {
    return courts
      ?.filter((court: any) => court.gx && court.gy)
      ?.map((court: any) => ({
        location: new window.google.maps.LatLng(Number(court.gx), Number(court.gy)),
        weight: court.weight ?? 1,
      }));
  }, []);

  const handleResetZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(defaultZoom);
      mapRef.current.panTo(center);
    }
  };

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
      <Card.Body p={0}>
        <VStack gap={0} align={'stretch'} h={'full'}>
          <HStack justify={'space-between'}>
            <Text p={'2'} fontWeight={'semibold'}>
              خرائط الانتشار والمهام
            </Text>

            <CircleIcon cursor={'pointer'} onClick={handleResetZoom} />
          </HStack>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={defaultZoom}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
              setMapLoaded(true);
            }}>
            {mapLoaded && heatmapData?.length > 0 && (
              <HeatmapLayer
                data={heatmapData}
                options={{
                  radius: 50,
                  opacity: 0.6,
                }}
              />
            )}
          </GoogleMap>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
