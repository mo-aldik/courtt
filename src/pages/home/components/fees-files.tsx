import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { formatNumber } from 'utils/format-number';
import { FileAction } from './file-action';

export const FeesFiles = ({ data }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>ملفات الرسوم و الغرامات</Text>

          <HStack align={'stretch'}>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontWeight={'semibold'} fontSize={'xl'}>
                    {formatNumber(data?.feesFinesCases?.cases?.totalOpenYtd ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>الملفات المقيدة</Text>

                    {chartTypes?.feesFinesCases_cases_totalOpenYtd && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.feesFinesCases_cases_totalOpenYtd}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontWeight={'semibold'} fontSize={'xl'}>
                    {formatNumber(data?.feesFinesCases?.cases?.totalOpenToday ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>الملفات المقيدة</Text>

                    {chartTypes?.feesFinesCases_cases_totalOpenToday && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.feesFinesCases_cases_totalOpenToday}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <HStack align={'stretch'} h={'full'}>
            <FileAction dataV2={data} />
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
