import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { GoogleMap, InfoWindow, OverlayView } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import markPinImg from '../../../assets/imgs/mark-pin.png';
import { CircleIcon } from '../icons/circle-icon';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '300px',
};

const mapOptions = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#23294f' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#23294f' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2e375f' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8ca1' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#1a213b' }] },
    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#23294f' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  ],
  disableDefaultUI: true,
  clickableIcons: false,
};

const center = { lat: 25.276987, lng: 55.296249 };
const defaultZoom = 11;

export const CourtMap = ({ courts }: any) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

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
              أماكن الحارس القضائي
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
            {mapLoaded &&
              courts?.map((marker: any) => (
                <OverlayView
                  key={marker.id}
                  position={{
                    lat: Number(marker.lat),
                    lng: Number(marker.lng),
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <img
                    src={markPinImg}
                    alt='Court Marker'
                    style={{ width: 60, height: 60, cursor: 'pointer' }}
                    onClick={() => setSelectedMarker(marker)}
                  />
                </OverlayView>
              ))}

            {mapLoaded && selectedMarker && (
              <InfoWindow
                position={{
                  lat: Number(selectedMarker?.lat),
                  lng: Number(selectedMarker?.lng),
                }}
                onCloseClick={() => setSelectedMarker(null)}>
                <VStack align={'stretch'} color={'black'} minW={'160px'}>
                  <HStack>
                    <Text fontWeight='semibold'> اسم الحارس القضائي:</Text>
                    <Text>{selectedMarker?.extra_info?.guardianName ?? '---'}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'> المنطقة:</Text>
                    <Text>{selectedMarker?.extra_info?.address || '---'}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'> رقم القضية:</Text>
                    <Text>{selectedMarker?.caseId ?? '---'}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'> نوع القضية:</Text>
                    <Text>{selectedMarker?.caseType ?? '---'}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'> درجة الخطوره:</Text>
                    <Text>{selectedMarker?.extra_info?.hazardLevelAr ?? '---'}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'>ملف الدعوي:</Text>
                    <Text>{`${selectedMarker?.extra_info?.fileNumber} / ${selectedMarker?.extra_info?.fileYear}`}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight='semibold'>حالة المكان:</Text>
                    <Text>{selectedMarker?.extra_info?.locationStatusAr ?? '---'}</Text>
                  </HStack>
                </VStack>
              </InfoWindow>
            )}
          </GoogleMap>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
