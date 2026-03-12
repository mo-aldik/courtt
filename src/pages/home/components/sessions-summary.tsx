import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from 'utils/format-number';

const COLORS = ['grad1', 'grad2'];

export const SessionsSummary = ({ dataV2 }: any) => {
  const data = [
    { name: 'عدد الدعاوى التي تم الفصل فيها', value: dataV2?.hasteCases?.cases?.totalClosedYtd ?? 0 },
    { name: 'الدعاوى المتداولة', value: dataV2?.hasteCases?.cases?.totalOpenYtd ?? 0 },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <VStack align={'stretch'}>
      <Box w='full' minH={'300px'} h={'full'}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={400} height={400}>
            <defs>
              <linearGradient id='grad2' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#FF9364' />
                <stop offset='100%' stopColor='#F25F33' />
              </linearGradient>

              <linearGradient id='grad1' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='rgba(24, 144, 255, 1)' />
                <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
              </linearGradient>
            </defs>

            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={70}
              outerRadius={'100%'}
              fill='#8884d8'
              stroke='#23294f'
              strokeWidth={2}
              dataKey='value'
              labelLine={false}
              label={({ cx, cy, percent, index }) => {
                if (index !== 0) return null;

                const percentage = ((percent as number) ?? 0) * 100;
                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor='middle'
                    dominantBaseline='central'
                    fill='white'
                    fontSize='16px'
                    fontWeight='bold'>
                    <tspan x={cx} dy='-0.6em'>{`${percentage.toFixed(0)}%`}</tspan>
                    <tspan x={cx} dy='1.2em'>
                      تم الفصل فيها
                    </tspan>
                  </text>
                );
              }}>
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={`url(#${COLORS[index % COLORS.length]})`} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <HStack align={'stretch'} w={'full'}>
        <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
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
                  {formatNumber(dataV2?.hasteCases?.cases?.totalClosedYtd ?? 0)}
                </Text>

                <HStack>
                  <Text fontSize='sm'>عدد الدعاوى التي تم الفصل فيها</Text>

                  {chartTypes?.hasteCases_cases_totalClosedYtd && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.hasteCases_cases_totalClosedYtd}
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
              <Box h={'full'} minH={'40px'} w={'4px'} bg='linear-gradient(180deg, #FF9364 0%, #F25F33 100%)' />

              <VStack align={'stretch'}>
                <Text fontSize={'xl'} fontWeight={'semibold'}>
                  {formatNumber(dataV2?.hasteCases?.cases?.totalOpenYtd ?? 0)}
                </Text>

                <HStack>
                  <Text fontSize='sm'>الدعاوى المتداولة</Text>

                  {chartTypes?.hasteCases_cases_totalOpenYtd && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.hasteCases_cases_totalOpenYtd}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </HStack>
    </VStack>
  );
};
