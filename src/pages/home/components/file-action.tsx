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

export const FileAction = ({ dataV2 }: any) => {
  const data = [
    { name: 'المتخذ بها إجراءات', value: dataV2?.feesFinesCases?.cases?.totalDecidedCountYtd ?? 0 },
    { name: 'الباقي', value: dataV2?.feesFinesCases?.cases?.totalPendingYtd ?? 0 },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>نسبة الملفات المتخذ بها الإجراء</Text>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart width={400} height={400}>
                {/* Define Gradients */}
                <defs>
                  <linearGradient id='gradPink' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(216, 61, 108, 1)' />
                    <stop offset='100%' stopColor='rgba(216, 61, 108, 0.2)' />
                  </linearGradient>
                  <linearGradient id='gradBlue' x1='0' y1='0' x2='0' y2='1'>
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
                  <Cell key='cell-0' fill='url(#gradPink)' />
                  <Cell key='cell-1' fill='url(#gradBlue)' />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <HStack>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
              <Card.Body p={'2'}>
                <HStack align={'stretch'}>
                  <Box
                    h={'full'}
                    minH={'40px'}
                    w={'4px'}
                    bg='linear-gradient(180deg, rgba(216, 61, 108, 1) 0%, rgba(216, 61, 108, 0.2) 100%)'
                  />

                  <VStack align={'stretch'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                      {formatNumber(dataV2?.feesFinesCases?.cases?.totalDecidedCountYtd ?? 0)}
                    </Text>

                    <HStack>
                      <Text fontSize='sm'>المتخذ بها إجراءات</Text>

                      {chartTypes?.feesFinesCases_cases_totalDecidedCountYtd && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.feesFinesCases_cases_totalDecidedCountYtd}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box
                    h={'full'}
                    minH={'40px'}
                    w={'4px'}
                    bg='linear-gradient(180deg, rgba(24, 144, 255, 1) 0%, rgba(24, 144, 255, 0.2) 100%)'
                  />

                  <VStack align={'stretch'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                      {formatNumber(dataV2?.feesFinesCases?.cases?.totalPendingYtd ?? 0)}
                    </Text>

                    <HStack>
                      <Text fontSize='sm'>الباقي</Text>

                      {chartTypes?.feesFinesCases_cases_totalPendingYtd && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.feesFinesCases_cases_totalPendingYtd}
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
