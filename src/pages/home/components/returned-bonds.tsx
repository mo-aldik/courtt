import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from 'utils/format-number';

const COLORS = ['gradient1', '#515573'];

export const ReturnedBonds = ({ dataV2 }: any) => {
  const totalRejected = dataV2?.voucherStatistics?.totalRejected7d ?? 0;
  const rejectedPercentage = dataV2?.voucherStatistics?.rejectedPercentage7d ?? 0;

  const totalVoucher = dataV2?.voucherStatistics?.total7d ?? 0;

  const data = [
    { name: 'السندات الراجعة ', value: totalRejected },

    { name: 'إجمالي السندات', value: +totalVoucher },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#353535'} size={'sm'} w={'full'} h={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'} mb={'60px'}>
            السندات الراجعة من الإجمالي
          </Text>

          <Box w='full' minH={'300px'} h={'full'} mb={'-100px'}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <defs>
                  <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='rgba(255, 147, 100, 1)' />
                    <stop offset='100%' stopColor='rgba(242, 95, 51, 1)' />
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
                      fill={index === 0 ? 'url(#gradient1)' : COLORS[index % COLORS.length]}
                    />
                  ))}

                  <Label
                    value={`${rejectedPercentage} % `}
                    position='center'
                    fill='white'
                    fontSize={24}
                    dy={5}
                    fontWeight='bold'
                  />

                  <Label
                    value={` السندات الراجعة`}
                    dy={30}
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

          <HStack align={'stretch'} w={'full'}>
            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#353535'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(totalRejected ?? 0)}
                  </Text>

                  <HStack>
                    <Text>السندات الراجعة </Text>

                    {chartTypes?.voucherStatistics_totalRejected7d && (
                      <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                        {chartTypes?.voucherStatistics_totalRejected7d}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#353535'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <VStack align={'stretch'}>
                  <Text fontSize={'xl'} fontWeight={'semibold'}>
                    {formatNumber(totalVoucher ?? 0)}
                  </Text>

                  <HStack>
                    <Text>إجمالي السندات </Text>

                    {chartTypes?.voucherStatistics_total7d && (
                      <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                        {chartTypes?.voucherStatistics_total7d}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </HStack>

          <Card.Root bgColor={'#33385b'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
            <Card.Body p={'2'}>
              <VStack align={'stretch'}>
                <Text fontSize={'xl'} fontWeight={'semibold'}>
                  {formatNumber(dataV2?.voucherStatistics?.delayedRejectedCount7d ?? 0)}
                </Text>

                <HStack>
                  <Text>تجاوزت زمن المعالجة</Text>

                  {chartTypes?.voucherStatistics_delayedRejectedCount7d && (
                    <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                      {chartTypes?.voucherStatistics_delayedRejectedCount7d}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
