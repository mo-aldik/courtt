// @ts-nocheck
import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CaseDetailsDialog from './modal';

const MOCK_CASE_DATA = [
  { id: '50/2026', type: 'تنفيذ رسوم تجاري', amount: '3,427.00', status: 'مسجلة', judge: 'جاسم محمد الزرعوني' },
  { id: '1/2025', type: 'منازعة موضوعية', amount: '16,118.00', status: 'مفصولة', judge: 'إبراهيم السيد محمد' },
  { id: '788/2025', type: 'تنفيذ عمالي', amount: '137,109.00', status: 'قيد التنفيذ', judge: 'يوسف المرزوقي' },
];

export const Prisoners = ({ dataV1 }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  console.log(dataV1);

  const data = [
    {
      name: dataV1?.arrestsStatistics?.durations?.[0]?.title,
      pv: dataV1?.arrestsStatistics?.durations?.[0]?.count ?? 0,
    },
    {
      name: dataV1?.arrestsStatistics?.durations?.[1]?.title,
      pv: dataV1?.arrestsStatistics?.durations?.[1]?.count ?? 0,
    },
    {
      name: dataV1?.arrestsStatistics?.durations?.[2]?.title,
      pv: dataV1?.arrestsStatistics?.durations?.[2]?.count ?? 0,
    },
  ];

  // 2. دالة عند الضغط على البار
  const handleBarClick = (entry: any) => {
    setSelectedData(entry);
    setIsOpen(true);
  };

  const CustomYAxisTick = ({ x, y, payload }: any) => {
    if (!payload) return null;
    const label = payload.value;
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={0} y={-12} width={123} height={30}>
          <HStack>
            <Text color='white' fontSize='sm' whiteSpace='nowrap'>
              {label}
            </Text>
          </HStack>
        </foreignObject>
      </g>
    );
  };

  return (
    <>
      <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} w={'full'}>
        <Card.Body p={'2'}>
          <VStack align={'stretch'} h={'full'}>
            <Text fontWeight={'semibold'}>الطلبات التي تم عرضها و لم يتخذ فيها قرار</Text>

            <Box w='full' minH={'100px'} h={'full'}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart layout='vertical' data={data}>
                  <defs>
                    <linearGradient id='grad2220' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(49, 68%, 65%)' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='hsl(49, 56%, 43%)' stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id='grad2221' x1='0' y1='0' x2='1' y2='0'>
                      <stop offset='5%' stopColor='#fa8c16' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#fa8c16' stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id='grad2222' x1='0' y1='0' x2='1' y2='0'>
                      <stop offset='5%' stopColor='#f5222d' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#f5222d' stopOpacity={0.2} />
                    </linearGradient>
                  </defs>

                  <XAxis type='number' reversed={true} domain={[0, 'dataMax']} hide />
                  <YAxis orientation='right' dataKey='name' type='category' width={130} tick={<CustomYAxisTick />} />

                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <Box bg='white' color='black' p={2} borderRadius='md' boxShadow='md'>
                            <Text fontWeight='bold'>{data.name}</Text>
                            <Text> {data.pv}</Text>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />

                  <Bar
                    dataKey='pv'
                    stackId='a'
                    radius={[0, 4, 4, 0]}
                    onClick={handleBarClick}
                    style={{ cursor: 'pointer' }}>
                    {data?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#grad222${index})`} />
                    ))}
                    <LabelList dataKey='pv' position='center' fill='white' />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>

      <CaseDetailsDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
