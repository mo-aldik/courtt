import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const SalesAssignments = ({ dataV2 }: any) => {
  const data1 = [
    {
      name: 'تكليفات البيع ',
      المنقولات: dataV2?.auction?.surplus?.ontime,
      المركبات: dataV2?.auction?.cars?.ontime,
      العقارات: dataV2?.auction?.properties?.ontime,
    },
    {
      name: ' تجاوزت المدة الزمنية ',
      المنقولات: dataV2?.auction?.surplus?.delayed,
      المركبات: dataV2?.auction?.cars?.delayed,
      العقارات: dataV2?.auction?.properties?.delayed,
    },
  ];

  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor='#23294f' color='white' borderColor='#353535' size='sm' h='full' w='full'>
      <Card.Body p='2'>
        <VStack align={'stretch'} h={'full'} minH={'150px'}>
          <HStack justify={'space-between'} w='full' px={2} mb={2}>
            <Text p={2} fontWeight={'semibold'}>
              تكليفات البيع
            </Text>
            <HStack>
              <HStack align={'center'}>
                <Box
                  boxSize={3}
                  bgGradient='linear-gradient(180deg, rgba(216,61,108,1) 0%, rgba(216,61,108,0.2) 100%)'
                  borderRadius='full'
                />
                <HStack>
                  <Text fontSize='sm'>المنقولات</Text>

                  {chartTypes?.auction_surplus_delayed && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.auction_surplus_delayed}
                    </Text>
                  )}
                </HStack>
              </HStack>

              <HStack align={'center'}>
                <Box
                  boxSize={3}
                  bgGradient='linear-gradient(180deg, rgba(24,144,255,1) 0%, rgba(24,144,255,0.2) 100%)'
                  borderRadius='full'
                />
                <HStack>
                  <Text fontSize='sm'>المركبات</Text>

                  {chartTypes?.auction_cars_delayed && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.auction_cars_delayed}
                    </Text>
                  )}
                </HStack>
              </HStack>

              <HStack align={'center'}>
                <Box
                  boxSize={3}
                  bgGradient='linear-gradient(180deg, rgba(242,153,61,1) 0%, rgba(242,153,61,0.5) 100%)'
                  borderRadius='full'
                />
                <HStack>
                  <Text fontSize='sm'>العقارات</Text>

                  {chartTypes?.auction_properties_delayed && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.auction_properties_delayed}
                    </Text>
                  )}
                </HStack>
              </HStack>
            </HStack>
          </HStack>

          <Box w='full' minH={'100px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart width={500} height={300} data={data1} barSize={35}>
                <defs>
                  <linearGradient id='grad1642' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(24,144,255,1)' />
                    <stop offset='100%' stopColor='rgba(24,144,255,0.2)' />
                  </linearGradient>
                  <linearGradient id='grad2543534' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(216,61,108,1)' />
                    <stop offset='100%' stopColor='rgba(216,61,108,0.2)' />
                  </linearGradient>
                  <linearGradient id='grad33534' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(242,153,61,1)' />
                    <stop offset='100%' stopColor='rgba(242,153,61,0.5)' />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey='name'
                  reversed={true}
                  tick={{ fill: 'white' }}
                  axisLine={{ stroke: 'white' }}
                  tickLine={{ stroke: 'white' }}
                />
                <YAxis
                  axisLine={{ stroke: 'white' }}
                  tickLine={{ stroke: 'white' }}
                  orientation='right'
                  tick={{ fill: 'white', dx: 40 }}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                          <Text fontWeight='bold'>{data.name}</Text>
                          <Text>المنقولات: {data.المنقولات ?? 0}</Text>
                          <Text>المركبات: {data.المركبات ?? 0}</Text>
                          <Text>العقارات: {data.العقارات ?? 0}</Text>
                        </Box>
                      );
                    }
                    return null;
                  }}
                />
                <CartesianGrid strokeDasharray='3 3' stroke='#33385b' />

                <Bar
                  dataKey='العقارات'
                  label={{
                    fill: 'white',
                    position: 'centerTop',
                    style: { fontSize: '18px', color: '#fff' },
                  }}
                  stackId='c'
                  fill='url(#grad33534)'
                  radius={[6, 6, 0, 0]}
                  minPointSize={10}
                />

                <Bar
                  dataKey='المركبات'
                  label={{
                    fill: 'white',
                    position: 'centerTop',
                    style: { fontSize: '18px', color: '#fff' },
                  }}
                  stackId='a'
                  fill='url(#grad1642)'
                  radius={[6, 6, 0, 0]}
                  minPointSize={10}
                />

                <Bar
                  dataKey='المنقولات'
                  label={{
                    fill: 'white',
                    position: 'centerTop',
                    style: { fontSize: '18px' },
                  }}
                  stackId='b'
                  fill='url(#grad2543534)'
                  radius={[6, 6, 0, 0]}
                  minPointSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
