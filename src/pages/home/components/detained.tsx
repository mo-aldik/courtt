import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['gradient1532', '#515573'];

export const Detained = ({ dataV1 }: any) => {
  const total = dataV1?.arrestsStatistics?.totalCountYtd || 0;
  const refrain = dataV1?.arrestsStatistics?.totalRefrainYtd || 0;
  const percentage = total > 0 ? ((refrain / total) * 100).toFixed(1) : 0;
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  const data = [
    {
      name: 'عدد المضبوطين - الغاء الاحضار' + ` (${chartTypes?.arrestsStatistics_totalRefrainYtd})`,
      value: refrain,
    },
    {
      name: 'اجمالي اوامر الضبط والاحضار الصادرة' + ` (${chartTypes?.arrestsStatistics_totalCountYtd})`,
      value: total,
    },
  ];

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} minH={'180px'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'} gap={8}>
          <HStack>
            <Text fontWeight={'semibold'}> المضبوطين</Text>

            {chartTypes?.arrestsStatistics_totalRefrainYtd && (
              <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                {chartTypes?.arrestsStatistics_totalRefrainYtd}
              </Text>
            )}
          </HStack>

          <Box w='full' minH={'150px'} h={'full'} mb={-28} mt={'-28px'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <defs>
                  <linearGradient id='gradient1532' x1='0%' y1='0%' x2='100%' y2='0%'>
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
                      fill={index === 0 ? 'url(#gradient1532)' : COLORS[index % COLORS.length]}
                    />
                  ))}

                  <Label
                    value={`${percentage}%`}
                    position='center'
                    fill='white'
                    fontSize={24}
                    dy={5}
                    fontWeight='bold'
                  />

                  <Label
                    dy={28}
                    value={`نسبة المضبوطين من إجمالي اوامر الضبط `}
                    position='center'
                    fill='white'
                    fontSize={24}
                    fontWeight='bold'
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
