import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'المحصل', value: 120 },
  { name: 'الباقي', value: 73 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#22447a'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const AchievementRate = () => {
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>نسبة المحصل</Text>

          <Box w='full' minH={'150px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius='100%'
                  fill='#8884d8'
                  stroke='#23294f'
                  strokeWidth={2}
                  dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <HStack>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box h={'full'} minH={'40px'} w={'3px'} bgColor={'#0088FE'} />

                  <VStack align={'stretch'}>
                    <Text>120</Text>

                    <Text>المحصل</Text>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box h={'full'} minH={'40px'} w={'3px'} bgColor={'#22447a'} />

                  <VStack align={'stretch'}>
                    <Text>73</Text>

                    <Text>الباقي</Text>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
