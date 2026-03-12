import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from 'utils/format-number';
import { CalendarIcon } from '../icons/calendar-icon';

export const Requests = ({ dataV2 }: any) => {
  const getMaxValue = (dataV2: any) => {
    const values = [
      dataV2?.comprehensivePetitions?.comprehensivePetitionsDelayedYtd,
      dataV2?.comprehensivePetitions?.comprehensivePetitionsCreatedYtd,
      dataV2?.comprehensivePetitions?.comprehensivePetitionsPendingYtd,
      dataV2?.smartPetitions?.smartPetitionsDelayedYtd,
      dataV2?.smartPetitions?.smartPetitionsCreatedYtd,
    ].filter((v): v is number => typeof v === 'number');

    return Math.max(...values, 0);
  };

  const getSmartChartValue = (
    value: number | undefined,
    maxValue: number,
    minRatio = 0.07, // 7% من أكبر قيمة
  ) => {
    const actual = value ?? 0;
    if (actual === 0) return 0;

    const minVisible = maxValue * minRatio;

    return actual < minVisible ? minVisible : actual;
  };

  const maxValue = getMaxValue(dataV2);

  const data = [
    {
      name: 'الطلبات الشاملة',
      المتأخرة: dataV2?.comprehensivePetitions?.comprehensivePetitionsDelayedYtd ?? 0,
      المقيدة: dataV2?.comprehensivePetitions?.comprehensivePetitionsCreatedYtd ?? 0,
      المسندة: dataV2?.comprehensivePetitions?.comprehensivePetitionsPendingYtd ?? 0,

      المتأخرة_Chart: getSmartChartValue(dataV2?.comprehensivePetitions?.comprehensivePetitionsDelayedYtd, maxValue),
      المقيدة_Chart: getSmartChartValue(dataV2?.comprehensivePetitions?.comprehensivePetitionsCreatedYtd, maxValue),
      المسندة_Chart: getSmartChartValue(dataV2?.comprehensivePetitions?.comprehensivePetitionsPendingYtd, maxValue),
    },
    {
      name: 'الطلبات الذكية',
      المتأخرة: dataV2?.smartPetitions?.smartPetitionsDelayedYtd ?? 0,
      المقيدة: dataV2?.smartPetitions?.smartPetitionsCreatedYtd ?? 0,

      المتأخرة_Chart: getSmartChartValue(dataV2?.smartPetitions?.smartPetitionsDelayedYtd, maxValue),
      المقيدة_Chart: getSmartChartValue(dataV2?.smartPetitions?.smartPetitionsCreatedYtd, maxValue),
    },
  ];
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);

  return (
    <Card.Root bgColor='#23294f' color='white' borderColor='#353535' size='sm' h='full' w='full'>
      <Card.Body p='2'>
        <VStack align={'stretch'} h={'full'}>
          <HStack justify={'start'} alignItems={'center'}>
            <Text p={2} fontWeight={'semibold'}>
              الطلبات
            </Text>

            <Text p={2} fontWeight={'normal'} fontSize={'sm'}>
              (تنفيذ الأحكام)
            </Text>
          </HStack>

          <Box w='full' minH={'335px'} h={'full'}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart width={500} height={300} data={data} barSize={50}>
                <defs>
                  <linearGradient id='grad1642' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(24,144,255,1)' />
                    <stop offset='100%' stopColor='rgba(24,144,255,0.2)' />
                  </linearGradient>
                  <linearGradient id='grad2543534' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(216,61,108,1)' />
                    <stop offset='100%' stopColor='rgba(216,61,108,0.2)' />
                  </linearGradient>
                  <linearGradient id='grad33534' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='rgba(242,153,61,1)' />
                    <stop offset='100%' stopColor='rgba(242,153,61,0.5)' />
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
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                          <Text fontWeight='bold'>{data.name}</Text>
                          <Text>المتأخرة: {data.المتأخرة ?? 0}</Text>
                          <Text>المقيدة: {data.المقيدة ?? 0}</Text>
                          {data.المسندة ? <Text>المسندة: {data.المسندة}</Text> : ''}
                        </Box>
                      );
                    }
                    return null;
                  }}
                />

                <CartesianGrid strokeDasharray='3 3' stroke='#33385b' />

                <Bar dataKey='المتأخرة_Chart' stackId='a' fill='url(#grad2543534)' radius={[3, 3, 0, 0]}>
                  <LabelList
                    formatter={(value: any) => formatNumber(value ?? 0)}
                    style={{ fontSize: '18px' }}
                    dataKey='المتأخرة'
                    position='top'
                    fill='white'
                    dy={20}
                  />
                </Bar>

                <Bar dataKey='المقيدة_Chart' stackId='a' fill='url(#grad1642)' radius={[3, 3, 0, 0]}>
                  <LabelList
                    formatter={(value: any) => formatNumber(value ?? 0)}
                    style={{ fontSize: '18px' }}
                    dataKey='المقيدة'
                    position='center'
                    fill='white'
                  />
                </Bar>

                <Bar dataKey='المسندة_Chart' stackId='a' fill='url(#grad33534)' radius={[3, 3, 0, 0]}>
                  <LabelList
                    formatter={(value: any) => formatNumber(value ?? 0)}
                    style={{ fontSize: '18px' }}
                    dataKey='المسندة'
                    position='bottom'
                    dy={-20}
                    fill='white'
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <HStack alignSelf={'center'} pb={4}>
            <HStack align={'center'}>
              <Box
                boxSize={3}
                bgGradient='linear-gradient(180deg, rgba(216,61,108,1) 0%, rgba(216,61,108,0.2) 100%)'
                borderRadius='full'
              />
              <HStack>
                <Text fontSize='sm'>المتأخرة</Text>

                {chartTypes?.comprehensivePetitions_comprehensivePetitionsDelayedYtd && (
                  <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                    {chartTypes?.comprehensivePetitions_comprehensivePetitionsDelayedYtd}
                  </Text>
                )}
              </HStack>
            </HStack>

            <HStack align={'center'}>
              <Box
                boxSize={3}
                bgGradient='linear-gradient(180deg, rgba(24,144,255,1) 0%, rgba(24,144,255,0.2) 100%)'
                borderRadius='full'
              />
              <HStack>
                <Text fontSize='sm'>المقيدة</Text>

                {chartTypes?.comprehensivePetitions_comprehensivePetitionsCreatedYtd && (
                  <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                    {chartTypes?.comprehensivePetitions_comprehensivePetitionsCreatedYtd}
                  </Text>
                )}
              </HStack>
            </HStack>

            <HStack align={'center'}>
              <Box
                boxSize={3}
                bgGradient='linear-gradient(180deg, rgba(242,153,61,1) 0%, rgba(242,153,61,0.5) 100%)'
                borderRadius='full'
              />
              <HStack>
                <Text fontSize='sm'>المسندة</Text>

                {chartTypes?.comprehensivePetitions_comprehensivePetitionsPendingYtd && (
                  <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                    {chartTypes?.comprehensivePetitions_comprehensivePetitionsPendingYtd}
                  </Text>
                )}
              </HStack>
            </HStack>
          </HStack>

          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
            <Card.Body p={'2'}>
              <HStack gap={4} justify={'space-between'}>
                <VStack align={'stretch'}>
                  <Text>الطلبات الشاملة</Text>

                  <HStack>
                    <Text>تاريخ أبعد طلب مجدول</Text>

                    <Text fontWeight={'semibold'}>
                      {(dataV2?.comprehensivePetitions?.comprehensivePetitionsLatestSchedule &&
                        new Date(dataV2.comprehensivePetitions.comprehensivePetitionsLatestSchedule).toLocaleDateString(
                          'en-GB',
                        )) ??
                        '--'}
                    </Text>
                  </HStack>
                </VStack>

                <CalendarIcon />
              </HStack>
            </Card.Body>
          </Card.Root>

          <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
            <Card.Body p={'2'}>
              <HStack gap={4} justify={'space-between'}>
                <VStack align={'stretch'}>
                  <Text> الطلبات الذكية </Text>

                  <HStack>
                    <Text>تاريخ أبعد طلب مجدول</Text>

                    <Text fontWeight={'semibold'}>
                      {(dataV2?.smartPetitions?.smartPetitionsLatestSchedule &&
                        new Date(dataV2.smartPetitions.smartPetitionsLatestSchedule).toLocaleDateString('en-GB')) ??
                        '--'}
                    </Text>
                  </HStack>
                </VStack>

                <CalendarIcon />
              </HStack>
            </Card.Body>
          </Card.Root>

          <HStack>
            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack justify={'space-between'}>
                  <HStack>
                    <Text fontSize='sm'>إجمالي الطلبات الشاملة المتأخرة </Text>

                    {chartTypes?.comprehensivePetitions_pendingLfm && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.comprehensivePetitions_pendingLfm}
                      </Text>
                    )}
                  </HStack>

                  <Text>{formatNumber(dataV2?.comprehensivePetitions?.pendingLfm ?? 0)}</Text>
                </HStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
              <Card.Body p={'2'}>
                <HStack justify={'space-between'}>
                  <HStack>
                    <Text fontSize='sm'>إجمالي الطلبات الذكية المتأخرة</Text>

                    {chartTypes?.smartPetitions_smartPetitionsDelayedLFM && (
                      <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                        {chartTypes?.smartPetitions_smartPetitionsDelayedLFM}
                      </Text>
                    )}
                  </HStack>

                  <Text>{formatNumber(dataV2?.smartPetitions?.smartPetitionsDelayedLFM ?? 0)}</Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
