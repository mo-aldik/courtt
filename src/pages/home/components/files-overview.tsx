import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from 'utils/format-number';

const COLORS = ['gradient19992', '#515573'];

export const FilesOverview = ({ dataV2 }: any) => {
  const total = dataV2?.hasteCases?.petitions?.petitionsOpenYtd ?? 0;
  const late = dataV2?.hasteCases?.petitions?.petitionsLateYtd ?? 0;

  const rejectedPercentage = total > 0 ? Math.round((late / total) * 100) : 0;

  const data = [
    {
      name: 'تجاوزت المستهدف',
      value: late,
    },
    { name: 'إجمالي طلبات القيد', value: total ?? 0 },
  ];

  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#353535'} size={'sm'} flex={1}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>
            طلبات قيد الملفات للأمور المستعجلة والمنازعات الموضوعية و الإشكالات والتظلمات
          </Text>

          <Box w='full' minH={'300px'} h={'full'} mb={['-100px', '-100px', '-100px', '-100px', '-130px']}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <defs>
                  <linearGradient id='gradient19992' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='rgba(24, 144, 255, 1)' />
                    <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
                  </linearGradient>
                </defs>

                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  startAngle={180}
                  endAngle={0}
                  innerRadius={'70%'}
                  outerRadius={'100%'}
                  fill='#8884d8'
                  stroke='#23294f'
                  strokeWidth={0}
                  dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={index === 0 ? 'url(#gradient19992)' : COLORS[index % COLORS.length]}
                    />
                  ))}

                  <Label
                    value={`${rejectedPercentage} % `}
                    position='center'
                    fill='white'
                    dy={5}
                    fontSize={24}
                    fontWeight='bold'
                  />

                  <Label
                    value={'نسبة الملفات التي تجاوزت المستهدف من المقيد'}
                    position='center'
                    dy={30}
                    fill='white'
                    fontSize={24}
                    fontWeight='bold'
                  />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <HStack align={'stretch'} w={'full'}>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(late ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>تجاوزت المستهدف</Text>

                    {chartTypes?.hasteCases_petitions_petitionsLateYtd && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.hasteCases_petitions_petitionsLateYtd}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(total ?? 0)}
                  </Text>

                  <HStack>
                    <Text fontSize='sm'>إجمالي طلبات القيد</Text>

                    {chartTypes?.hasteCases_petitions_petitionsOpenYtd && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.hasteCases_petitions_petitionsOpenYtd}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
