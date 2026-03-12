import { Box, Card, Text } from '@chakra-ui/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const SpendingTrends = ({ dataV2 }: any) => {
  const last12 = dataV2?.disbursementStatistics?.last12Months || [];

  const chartData = last12.map((item: any) => {
    return {
      name: item.petitionMonth,
      uv: item.avgDuration,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box bg='#1f2340' color='white' p='8px' borderRadius='8px' border='1px solid #3c3c3c'>
          <Text fontSize='sm' fontWeight='bold'>
            {label}
          </Text>
          <Text fontSize='sm'>القيمة: {payload[0].value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card.Root bgColor='#23294f' color='white' borderColor='#585252ff' size='sm' h='full' w='full'>
      <Card.Body p='2'>
        <Text fontWeight='semibold'>المعدل الشهري للصرف</Text>

        <Box w='full' minH='300px' h='full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData} margin={{ left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#3c3c3c' />

              <XAxis
                dataKey='name'
                reversed
                angle={-45}
                textAnchor='start'
                tick={{
                  fill: 'white',
                  style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                  },
                }}
                axisLine={{ stroke: 'white' }}
                tickLine={{ stroke: 'white' }}
              />

              <YAxis
                orientation='right'
                axisLine={{ stroke: 'white' }}
                tickLine={{ stroke: 'white' }}
                tick={{ fill: 'white', dx: 50 }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey='uv'
                fill='#0f54b3'
                radius={[6, 6, 0, 0]}
                label={{
                  position: 'center',
                  fill: 'white',
                  formatter: (value: any) => {
                    const num = Number(value);
                    return num;
                  },
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
