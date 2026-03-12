import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';

export const FileEnabat = ({ dataV2 }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  const data = [
    {
      name: 'ملفات الإنابات' + ` ${chartTypes?.csCases_enabat_registeredToday}`,
      pv: dataV2?.enabatStatistics?.registeredToday ?? 0,
    },
    {
      name: 'المتداول منها' + ` ${chartTypes?.csCases_enabat_open}`,
      pv: dataV2?.enabatStatistics?.open ?? 0,
    },
    {
      name: 'الملفات المنتهية' + ` ${chartTypes?.csCases_enabat_closed}`,
      pv: dataV2?.enabatStatistics?.closed ?? 0,
    },
  ];

  // الحصول على أعلى قيمة لتحديد نطاق المحور Y
  const maxValue = Math.max(dataV2?.enabatRegisteredToday ?? 0, dataV2?.enabatOpen ?? 0, dataV2?.enabatClosed ?? 0);
  const formatYAxisLabel = (value: number) => {
    // Concatenate the value with your desired string
    return `${value.toFixed(0)}`;
  };

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'}>
      <Card.Body p={2}>
        <VStack align={'stretch'} h={'full'}>
          <Text p={2} fontWeight={'semibold'}>
            الإنابات
          </Text>
          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
            <Card.Body p={'2'}>
              <VStack align={'stretch'}>
                <Text fontSize={'xl'} fontWeight={'semibold'}>
                  {dataV2?.enabatStatistics?.kpi?.enabatOneDayPercentage}%
                </Text>

                <HStack>
                  <Text fontSize='sm'>نسبة ملفات الإنابة المتجاوزة المستهدف</Text>

                  {chartTypes?.csCases_enabat_kpi_enabatOneDayPercentage && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.csCases_enabat_kpi_enabatOneDayPercentage}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
            <Card.Body p={'2'}>
              <Box w='full' minH={'150px'} h={'full'}>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart width={500} height={300} data={data} barSize={40}>
                    <defs>
                      <linearGradient id='barGradient56' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='rgba(24, 144, 255)' />
                        <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
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
                      tickFormatter={formatYAxisLabel}
                      domain={[0, maxValue * 1.1]}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                              <Text fontWeight='bold'>{data.name}</Text>
                              <Text>{data.pv}</Text>
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />

                    <CartesianGrid strokeDasharray='3 3' stroke='#33385b' />

                    <Bar
                      dataKey='pv'
                      fill='url(#barGradient56)'
                      background={{ fill: 'transparent' }}
                      radius={[10, 10, 0, 0]}
                      minPointSize={10}
                      label={{
                        fill: 'white',
                        position: 'center',
                        formatter: (value: any) => {
                          const num = Number(value);
                          return formatNumber(num);
                        },
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
