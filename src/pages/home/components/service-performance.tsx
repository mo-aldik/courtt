import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, SectorProps } from 'recharts';

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

const data = [
  { name: 'الشكاوى المتأخرة', value: 120 },
  { name: 'الباقي', value: 73 },
];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#333'>{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const COLORS = ['#1e83e1', '#f77346'];

export const ServicePerformance = () => {
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}> الشكاوى المتأخرة </Text>

          <Box w='full' minH={'300px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart width={400} height={400}>
                <Pie
                  activeShape={renderActiveShape}
                  data={data}
                  cx='50%'
                  cy='50%'
                  innerRadius={70}
                  outerRadius={'100%'}
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

          <HStack align={'stretch'} w={'full'}>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box h={'full'} minH={'40px'} w={'3px'} bgColor={'#1e83e1'} />

                  <VStack align={'stretch'}>
                    <Text>120</Text>

                    <Text>الشكاوى المتأخرة</Text>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack>
                  <Box h={'full'} minH={'40px'} w={'3px'} bgColor={'#f77346'} />

                  <VStack align={'stretch'}>
                    <Text>73</Text>

                    <Text>الباقي</Text>
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <HStack>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontWeight={'semibold'}>4hrs</Text>

                  <Text>مدة الانتظار</Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontWeight={'semibold'}>52</Text>

                  <Text>عدد المتعاملين</Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
            <Card.Body p={'2'}>
              <HStack gap={4} justify={'space-between'}>
                <VStack align={'stretch'}>
                  <Text fontWeight={'semibold'}>78</Text>

                  <Text>الخدمات المتكامل بها مع الجهات الأخرى</Text>
                </VStack>

                <Text fontWeight={'semibold'}>53%</Text>
              </HStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
