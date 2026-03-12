import { Box, Card, Text, VStack } from '@chakra-ui/react';
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: '  استبيانات خدمات العميل',
    pv: 43,
  },

  {
    name: 'الشكاوى',
    pv: 97,
  },

  {
    name: 'استبيانات الحكومة',
    pv: 76,
  },
];

export const SurveysSummary = () => {
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>الاستبيانات و الشكاوى</Text>

          <Box w='full' minH={'100px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart layout='vertical' data={data}>
                <XAxis type='number' reversed={true} domain={[0, 'dataMax']} hide />
                <YAxis orientation='right' dataKey='name' type='category' tick={{ fill: 'white', dx: 60 }} />

                <Tooltip />
                <Bar dataKey='pv' stackId='a' fill='#3e69a2'>
                  <LabelList dataKey='pv' position='right' fill='white' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
