import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';

export const PendingFiles = ({ dataV2 }: any) => {
  const data = [
    {
      name: 'Pending Files',
      pv: dataV2?.csDecisions?.rush?.applicationsSubmittedToday || 0,
      uv: dataV2?.csCases?.totalSubmittedToday || 0,
    },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack>
          <Box w='full' h={'100px'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart layout='vertical' data={data}>
                <defs>
                  <linearGradient id='gradientPv' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='0%' stopColor='rgba(24, 144, 255, 1)' />
                    <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
                  </linearGradient>

                  <linearGradient id='gradientUv' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='0%' stopColor='rgba(216, 61, 108, 1)' />
                    <stop offset='100%' stopColor='rgba(216, 61, 108, 0.2)' />
                  </linearGradient>
                </defs>

                <XAxis type='number' domain={[0, 'dataMax']} hide />
                <YAxis dataKey='name' type='category' hide />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    return (
                      <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                        <VStack align='start' gap={1}>
                          <Text>الملفات المقيدة: {formatNumber(payload[1].value)}</Text>

                          <Text>طلبات قيد الملفات للأمور المستعجلة: {formatNumber(payload[0].value)}</Text>
                        </VStack>
                      </Box>
                    );
                  }}
                />
                <Bar dataKey='pv' stackId='a' fill='url(#gradientPv)' radius={[10, 0, 0, 10]}>
                  <LabelList dataKey='pv' position='left' fill='white' />
                </Bar>
                <Bar dataKey='uv' stackId='a' fill='url(#gradientUv)' radius={[0, 10, 10, 0]}>
                  <LabelList dataKey='uv' position='left' fill='white' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <HStack gap={'8'}>
            <HStack>
              <Box
                h={'full'}
                minH={'40px'}
                w={'4px'}
                bg='linear-gradient(180deg, rgba(216, 61, 108, 1) 0%, rgba(216, 61, 108, 0.2) 100%)'
              />

              <HStack>
                <Text fontSize='sm'>الملفات المقيدة</Text>

                {chartTypes?.csCases_totalSubmittedToday && (
                  <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                    {chartTypes?.csCases_totalSubmittedToday}
                  </Text>
                )}
              </HStack>
            </HStack>

            <HStack>
              <Box
                h={'full'}
                minH={'40px'}
                w={'4px'}
                bg='linear-gradient(180deg, rgba(24, 144, 255, 1) 0%, rgba(24, 144, 255, 0.2) 100%)'
              />

              <HStack>
                <Text fontSize='sm'>طلبات قيد الملفات للأمور المستعجلة</Text>

                {chartTypes?.csDecisions_rush_applicationsSubmittedToday && (
                  <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                    {chartTypes?.csDecisions_rush_applicationsSubmittedToday}
                  </Text>
                )}
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
