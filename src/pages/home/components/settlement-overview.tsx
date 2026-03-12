import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const SettlementOverview = ({ dataV2 }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  const chartData = [
    {
      name: dataV2?.smartPetitions?.topDelayedSubjectsLfm[0]?.subject,
      pv: dataV2?.smartPetitions?.topDelayedSubjectsLfm[0]?.count ?? 0,
    },
    {
      name: dataV2?.smartPetitions?.topDelayedSubjectsLfm[1]?.subject,
      pv: dataV2?.smartPetitions?.topDelayedSubjectsLfm[1]?.count ?? 0,
    },
    {
      name: dataV2?.smartPetitions?.topDelayedSubjectsLfm[2]?.subject,
      pv: dataV2?.smartPetitions?.topDelayedSubjectsLfm[2]?.count ?? 0,
    },
    {
      name: dataV2?.smartPetitions?.topDelayedSubjectsLfm[3]?.subject,
      pv: dataV2?.smartPetitions?.topDelayedSubjectsLfm[3]?.count ?? 0,
    },
    {
      name: dataV2?.smartPetitions?.topDelayedSubjectsLfm[4]?.subject,
      pv: dataV2?.smartPetitions?.topDelayedSubjectsLfm[4]?.count ?? 0,
    },
  ];

  const CustomYAxisTick = ({ x, y, payload }: any) => {
    if (!payload) return null;
    const label = payload.value;

    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={0} y={-12} width={170} height={40}>
          <HStack>
            <Text color='white' fontSize='sm'>
              {label}
            </Text>
          </HStack>
        </foreignObject>
      </g>
    );
  };

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <HStack>
            <Text fontWeight={'semibold'}>تصنيف الطلبات الذكية المتأخرة</Text>

            {chartTypes?.smartPetitions_topDelayedSubjectsLfm_count && (
              <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                {chartTypes?.smartPetitions_topDelayedSubjectsLfm_count}
              </Text>
            )}
          </HStack>

          <Box w='full' minH={'250px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart layout='vertical' data={chartData} barSize={40}>
                <defs>
                  {/* Bar 1: Blue */}
                  <linearGradient id='grad0' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='5%' stopColor='hsl(49, 68%, 65%)' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='hsl(49, 56%, 43%)' stopOpacity={0.2} />
                  </linearGradient>
                  {/* Bar 2: Purple */}
                  <linearGradient id='grad1' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='5%' stopColor='#722ed1' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#722ed1' stopOpacity={0.2} />
                  </linearGradient>
                  {/* Bar 3: Cyan */}
                  <linearGradient id='grad2' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='5%' stopColor='#13c2c2' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#13c2c2' stopOpacity={0.2} />
                  </linearGradient>
                  {/* Bar 4: Orange */}
                  <linearGradient id='grad3' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='5%' stopColor='#fa8c16' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#fa8c16' stopOpacity={0.2} />
                  </linearGradient>
                  {/* Bar 5: Red/Pink */}
                  <linearGradient id='grad4' x1='0' y1='0' x2='1' y2='0'>
                    <stop offset='5%' stopColor='#f5222d' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#f5222d' stopOpacity={0.2} />
                  </linearGradient>
                </defs>

                <XAxis type='number' reversed={true} hide />
                <YAxis orientation='right' dataKey='name' type='category' width={180} tick={<CustomYAxisTick />} />

                <Tooltip cursor={{ fill: 'transparent' }} />

                <Bar dataKey='pv' radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#grad${index})`} />
                  ))}
                  <LabelList dataKey='pv' position='center' fill='white' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
