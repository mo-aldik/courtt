import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatNumber } from 'utils/format-number';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  // خلي الـ radius يكون بين inner و outer radius
  const radius = innerRadius + (outerRadius - innerRadius) * 0.85; // 85% من الطريق للحد الخارجي
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize={12} // ممكن تصغّر الخط للقطع الصغيرة
    >
      {`${((percent ?? 1) * 100).toFixed(1).replace(/\.?0+$/, '')}%`}
    </text>
  );
};

export const ExpenseRequests = ({ dataV2 }: any) => {
  const data = [
    { name: 'قيد الإجراء', value: dataV2?.disbursementStatistics?.disbursementPendingCountYtd ?? 0 },
    { name: 'المنجز', value: dataV2?.disbursementStatistics?.disbursementCompletedCountYtd ?? 0 },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <HStack justify={'space-between'}>
            <HStack>
              <Text fontWeight='semibold'>طلبات الصرف</Text>

              {/* {chartTypes?.disbursementStatistics_disbursementTotalPetitionsYtd && (
                <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                  {chartTypes?.disbursementStatistics_disbursementTotalPetitionsYtd}
                </Text>
              )} */}
            </HStack>

            {/* <Text fontSize={'xl'} fontWeight={'semibold'}>
              {formatNumber(dataV2?.disbursementStatistics?.disbursementTotalPetitionsYtd ?? 0)}
            </Text> */}
          </HStack>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <defs>
                  <linearGradient id='gradientBlue1432' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#00CEFF' />
                    <stop offset='100%' stopColor='#1890FF' />
                  </linearGradient>

                  <linearGradient id='gradientBlue24321' x1='0' y1='0' x2='0' y2='1'>
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
                      fill={index === 0 ? 'url(#gradientBlue1432)' : 'url(#gradientBlue24321)'}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <VStack>
            <HStack align={'stretch'} w={'full'}>
              <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
                <Card.Body p={'2'}>
                  <HStack>
                    <Box h={'full'} minH={'40px'} w={'3px'} bg='linear-gradient(180deg, #00CEFF 0%, #1890FF 100%)' />

                    <VStack align={'stretch'}>
                      <Text>{formatNumber(dataV2?.disbursementStatistics?.disbursementPendingCountYtd ?? 0)}</Text>

                      <HStack>
                        <Text fontSize='sm'>قيد الإجراء</Text>

                        {chartTypes?.disbursementStatistics_disbursementPendingCountYtd && (
                          <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                            {chartTypes?.disbursementStatistics_disbursementPendingCountYtd}
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
                      <Text>{formatNumber(dataV2?.disbursementStatistics?.disbursementCompletedCountYtd ?? 0)}</Text>

                      <HStack>
                        <Text fontSize='sm'>المنجز</Text>

                        {chartTypes?.disbursementStatistics_disbursementCompletedCountYtd && (
                          <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                            {chartTypes?.disbursementStatistics_disbursementCompletedCountYtd}
                          </Text>
                        )}
                      </HStack>
                    </VStack>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </HStack>

            <HStack align={'stretch'} w={'full'}>
              <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
                <Card.Body p={'2'}>
                  <VStack align={'stretch'}>
                    {/* <Text>{formatNumber(dataV2?.disbursementStatistics?.pendingCountLFM ?? 0)}</Text> */}
                    <Text>
                      {formatNumber(
                        dataV2?.disbursementStatistics?.disbursementCompletedCountYtd +
                          dataV2?.disbursementStatistics?.disbursementPendingCountYtd,
                      )}
                    </Text>

                    <HStack>
                      <Text fontSize='sm'>الإجمالي</Text>

                      {/* {chartTypes?.disbursementStatistics_pendingCountLFM && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.disbursementStatistics_pendingCountLFM}
                        </Text>
                      )} */}

                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        سنوي
                      </Text>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
                <Card.Body p={'2'}>
                  <VStack align={'stretch'}>
                    <Text>{formatNumber(dataV2?.disbursementStatistics?.avgProcessingDays ?? 0)}</Text>

                    <HStack>
                      <Text fontSize='sm'>المعدل الزمني </Text>

                      {chartTypes?.disbursementStatistics_avgProcessingDays && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.disbursementStatistics_avgProcessingDays}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
