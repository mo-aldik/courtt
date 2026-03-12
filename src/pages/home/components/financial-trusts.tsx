import { Box, Card, Text, VStack } from '@chakra-ui/react';
import { Deposits } from './deposits';

import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';

const getPath = (x: any, y: any, width: any, height: any): any => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
};

export const FinancialTrusts = ({ dataV2 }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  const data = [
    {
      name: 'عدد الأمانات المحصلة' + ` ${chartTypes?.voucherStatistics_ytdTransactionCount}`,
      uv: dataV2?.voucherStatistics?.ytdTransactionCount ?? 0,
    },

    {
      name: 'عدد المبالغ المصروفة' + ` ${chartTypes?.voucherStatistics_ytdDebitCount}`,
      uv: dataV2?.voucherStatistics?.ytdDebitCount ?? 0,
    },
  ];

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={2}>
        <VStack align={'stretch'} h={'full'}>
          <Text p={2} fontWeight={'semibold'}>
            الأمانات والصرف
          </Text>

          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
            <Card.Body p={'2'}>
              <VStack align={'stretch'}>
                <Text fontWeight={'semibold'}> السنة الحالية</Text>

                <Box w='full' minH={'150px'} h={'full'}>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={data}>
                      <defs>
                        <linearGradient id='barGradient102' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor='rgba(24, 144, 255)' />
                          <stop offset='100%' stopColor='rgba(24, 144, 255, 0.2)' />
                        </linearGradient>
                      </defs>

                      <XAxis reversed={true} dataKey='name' tick={{ fill: 'white' }} />
                      <YAxis
                        axisLine={{ stroke: 'white' }}
                        tickLine={{ stroke: 'white' }}
                        orientation='right'
                        tick={{ fill: 'white', dx: 50 }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                                <Text fontWeight='bold'>{data.name}</Text>
                                <Text>{data.uv.toFixed(2)}</Text>
                              </Box>
                            );
                          }
                          return null;
                        }}
                      />

                      <CartesianGrid strokeDasharray='3 3' stroke='#33385b' />

                      <Bar
                        dataKey='uv'
                        fill='url(#barGradient102)'
                        shape={<TriangleBar />}
                        minPointSize={10}
                        label={{
                          position: 'center',
                          fill: 'white',
                          formatter: (value: any) => {
                            const num = Number(value);
                            return isNaN(num) ? value : `${formatNumber(num.toFixed())}`;
                          },
                        }}>
                        {data.map((_, index) => (
                          <Cell key={`cell-${index}`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Deposits dataV2={dataV2} />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
