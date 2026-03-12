import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';

export const SettlementSummary = ({ data }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'}>
          <Text fontWeight={'semibold'}>{data?.averageSettlementDuration}hrs</Text>

          <HStack>
            <Text fontSize='sm'>متوسط مدة التسوية</Text>

            {chartTypes?.settlementStatistics_averageSettlementDuration && (
              <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                {chartTypes?.settlementStatistics_averageSettlementDuration}
              </Text>
            )}
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
