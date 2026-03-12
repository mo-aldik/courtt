import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { formatNumber } from 'utils/format-number';

export const Decisions = ({ data }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'}>
      <Card.Body p={2}>
        <VStack align={'stretch'}>
          <HStack justify={'start'} alignItems={'center'}>
            <Text p={2} fontWeight={'semibold'}>
              القرارات
            </Text>
            <Text p={2} fontWeight={'normal'} fontSize={'sm'}>
              (تنفيذ الأحكام)
            </Text>
          </HStack>

          <HStack>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {data?.memberDecisionsStatistics?.avgInsertionPeriod ?? 0} ساعة
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>متوسط زمن الإنجاز</Text>

                    {chartTypes?.memberDecisionsStatistics_avgInsertionPeriod && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.memberDecisionsStatistics_avgInsertionPeriod}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(data?.memberDecisionsStatistics?.countYtd ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>القرارات </Text>

                    {chartTypes?.memberDecisionsStatistics_countYtd && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.memberDecisionsStatistics_countYtd}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <HStack>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(data?.memberDecisionsStatistics?.totalDecidedYtd ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>القرارات المنجزة</Text>

                    {chartTypes?.memberDecisionsStatistics_totalDecidedYtd && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.memberDecisionsStatistics_totalDecidedYtd}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(data?.memberDecisionsStatistics?.countToday ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>القرارات</Text>

                    {chartTypes?.memberDecisionsStatistics_countToday && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.memberDecisionsStatistics_countToday}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <HStack>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(data?.memberDecisionsStatistics?.totalDelayedCount ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>تجاوزت المستهدف الزمني</Text>

                    {chartTypes?.memberDecisionsStatistics_totalDelayedCount && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.memberDecisionsStatistics_totalDelayedCount}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    400
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>القرارات العالقة</Text>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root> */}
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
