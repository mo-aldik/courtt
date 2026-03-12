import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from 'utils/format-number';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${((percent ?? 1) * 100).toFixed(2).replace(/\.?0+$/, '')}%`}
    </text>
  );
};

export const ReviewTime = ({ dataV2 }: any) => {
  const data = [
    { name: 'تجاوزت زمن المعالجة', value: dataV2?.voucherStatistics?.delayedRejectedCount7d ?? 0 },
    {
      name: 'لم تتجاوز',
      value: dataV2?.voucherStatistics?.totalRejectedOnTime7d ?? 0,
    },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>السندات الراجعة</Text>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <defs>
                  <linearGradient id='gradientBlue13' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#00CEFF' />
                    <stop offset='100%' stopColor='#1890FF' />
                  </linearGradient>

                  <linearGradient id='gradientBlue23' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(24, 144, 255, 1)' />
                    <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
                  </linearGradient>
                </defs>

                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius='100%'
                  fill='#8884d8'
                  stroke='#23294f'
                  strokeWidth={2}
                  dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={index === 0 ? 'url(#gradientBlue13)' : 'url(#gradientBlue23)'}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <HStack align={'stretch'} w={'full'} mt={'30px'}>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box h={'full'} minH={'40px'} w={'3px'} bg='linear-gradient(180deg, #00CEFF 0%, #1890FF 100%)' />

                  <VStack align={'stretch'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                      {formatNumber(dataV2?.voucherStatistics?.delayedRejectedCount7d ?? 0)}
                    </Text>

                    <HStack>
                      <Text>تجاوزت زمن المعالجة</Text>

                      {chartTypes?.voucherStatistics_delayedRejectedCount7d && (
                        <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                          {chartTypes?.voucherStatistics_delayedRejectedCount7d}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box
                    h={'full'}
                    minH={'40px'}
                    w={'3px'}
                    bg='linear-gradient(180deg, rgba(24, 144, 255, 1) 0%, rgba(24, 144, 255, 0.2) 100%)'
                  />

                  <VStack align={'stretch'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                      {formatNumber(dataV2?.voucherStatistics?.totalRejectedOnTime7d ?? 0)}
                    </Text>

                    <HStack>
                      <Text>لم تتجاوز</Text>

                      {chartTypes?.voucherStatistics_totalRejectedOnTime7d && (
                        <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                          {chartTypes?.voucherStatistics_totalRejectedOnTime7d}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
