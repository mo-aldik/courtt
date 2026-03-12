import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';

interface FilesProp {
  casesRegisteredToday?: number;
  casesRegisteredYtd?: number;
}

export const Files = ({ casesRegisteredToday, casesRegisteredYtd }: FilesProp) => {
  const data = [
    {
      name: 'ملفات السنة',
      pv: casesRegisteredYtd ?? 0,
    },
    { name: 'ملفات اليوم', pv: casesRegisteredToday ?? 0 },
  ];

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'}>
      <Card.Body p={2}>
        <VStack align={'stretch'} h={'full'}>
          <HStack justify={'start'} alignItems={'center'}>
            <Text p={2} fontWeight={'semibold'}>
              الملفات
            </Text>
            <Text p={2} fontWeight={'normal'} fontSize={'sm'}>
              (تنفيذ الأحكام)
            </Text>
          </HStack>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data} barSize={40}>
                <defs>
                  <linearGradient id='barGradient990' x1='0' y1='0' x2='0' y2='1'>
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
                  domain={[0, Math.max(casesRegisteredYtd ?? 0, casesRegisteredToday ?? 0)]}
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
                  fill='url(#barGradient990)'
                  background={{ fill: 'transparent' }}
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
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
