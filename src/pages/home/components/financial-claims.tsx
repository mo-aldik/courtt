import { Box, Card, Text, VStack } from '@chakra-ui/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'قيمة المطالبة األساسية',
    pv: 3000000,
  },
  {
    name: 'قيمة التسوية',
    pv: 1000000,
  },
];

export const FinancialClaims = () => {
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={2}>
        <VStack align={'stretch'} h={'full'}>
          <Text p={2} fontWeight={'semibold'}>
            قيمة المطالبة و التسوية
          </Text>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data} barSize={20}>
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
                  tick={{ fill: 'white', dx: 50 }}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3' stroke='#33385b' />
                <Bar dataKey='pv' fill='#8884d8' background={{ fill: 'transparent' }} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
