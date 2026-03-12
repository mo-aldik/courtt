import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';

export const TravelBan = ({ dataV1 }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  const data = [
    {
      name: 'عدد أوامر المنع' + ` ${chartTypes?.caseStatisticsSummary_totalTravelBansYtd}`,
      pv: dataV1?.caseStatisticsSummary?.totalTravelBansYtd ?? 0,
    },
    {
      name: 'عدد أوامر الإلغاء' + ` ${chartTypes?.caseStatisticsSummary_totalPermitsYtd}`,
      pv: dataV1?.caseStatisticsSummary?.totalPermitsYtd ?? 0,
    },
  ];

  const maxValue = Math.max(
    dataV1?.caseStatisticsSummary?.totalTravelBansYtd ?? 0,
    dataV1?.caseStatisticsSummary?.totalPermitsYtd ?? 0,
  );
  const formatYAxisLabel = (value: number) => {
    // Concatenate the value with your desired string
    return `${value.toFixed(0)}`;
  };
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={2}>
        <VStack align={'stretch'} h={'full'}>
          <HStack justify={'start'} alignItems={'center'}>
            <Text p={2} fontWeight={'semibold'}>
              المنع من السفر
            </Text>
            <Text p={2} fontWeight={'normal'} fontSize={'sm'}>
              (تنفيذ الأحكام)
            </Text>
          </HStack>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart width={500} height={300} data={data} barSize={40}>
                <defs>
                  <linearGradient id='barGradien' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(24, 144, 255)' />
                    <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey='name'
                  reversed={true}
                  tick={{
                    fill: 'white',
                    style: {
                      fontSize: '14px',
                    },
                  }}
                  axisLine={{ stroke: 'white' }}
                  tickLine={{ stroke: 'white' }}
                />
                <YAxis
                  axisLine={{ stroke: 'white' }}
                  tickLine={{ stroke: 'white' }}
                  orientation='right'
                  tickFormatter={formatYAxisLabel}
                  tick={{ fill: 'white', dx: 40 }}
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
                  fill='url(#barGradien)'
                  background={{ fill: 'transparent' }}
                  radius={[4, 4, 0, 0]}
                  minPointSize={10}
                  label={{
                    position: 'center',
                    fill: 'white',
                    formatter: (value: any) => {
                      const num = Number(value);
                      return formatNumber(num);
                    },
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
