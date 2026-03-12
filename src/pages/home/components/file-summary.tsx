import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { getChartTypesApiEndpointIdentifier } from 'apis/use-get-chart-types';
import { useGetQueryData } from 'hooks/use-get-query-data';
import { useState } from 'react';
import { formatNumber } from 'utils/format-number';
import { TimerIcon } from '../icons/timer-icon';
import CaseDetailsDialog from './modal';

export const FileSummary = ({ dataV2 }: any) => {
  const chartTypes = useGetQueryData([getChartTypesApiEndpointIdentifier]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card.Root
        bgColor={'#23294f'}
        color={'white'}
        borderColor={'#585252ff'}
        size={'sm'}
        h={'full'}
        onClick={() => setIsOpen(true)}>
        <Card.Body p={'2'}>
          <VStack align={'stretch'}>
            <HStack justify={'space-between'}>
              <HStack>
                <Text fontWeight={'semibold'}>الدعاوى المستعجلة و المنازعات الموضوعية و الإشكالات و التظلمات</Text>
              </HStack>
            </HStack>

            <HStack>
              <Card.Root
                bgColor={'#23294f'}
                color={'white'}
                borderColor={'#585252ff'}
                size={'sm'}
                w={'full'}
                h={'full'}>
                <Card.Body p={'2'}>
                  <VStack align={'stretch'}>
                    <Text fontWeight={'semibold'} color={'#b8b928'}>
                      {formatNumber(dataV2?.hasteCases?.cases?.totalCountYtd ?? 0)}
                    </Text>

                    <HStack>
                      <Text> الملفات المقيدة </Text>

                      {chartTypes?.hasteCases_cases_totalCountYtd && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.hasteCases_cases_totalCountYtd}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root
                bgColor={'#23294f'}
                color={'white'}
                borderColor={'#585252ff'}
                size={'sm'}
                w={'full'}
                h={'full'}>
                <Card.Body p={'2'}>
                  <VStack align={'stretch'}>
                    <Text fontWeight={'semibold'} color={'#b8b928'}>
                      {formatNumber(dataV2?.hasteCases?.cases?.totalCountToday ?? 0)}
                    </Text>

                    <HStack>
                      <Text>الملفات المقيدة</Text>

                      {chartTypes?.hasteCases_cases_totalCountToday && (
                        <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                          {chartTypes?.hasteCases_cases_totalCountToday}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </HStack>

            <HStack align={'stretch'}>
              <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
                <Card.Body p={'2'}>
                  <VStack align={'stretch'}>
                    <HStack gap={4} justify={'space-between'}>
                      <Text
                        fontWeight={'semibold'}
                        bgGradient='linear-gradient(90deg, rgba(255, 147, 100, 1) 0%, rgba(242, 95, 51, 1) 100%)'
                        bgClip='text'>
                        {formatNumber(dataV2?.hasteCases?.cases?.totalPushedYtd) ?? '0'}
                      </Text>

                      <Box bg={'#56D7561A'} px={4} py={1} borderRadius={'full'}>
                        <Text
                          fontWeight={'semibold'}
                          bgGradient='linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)'
                          bgClip='text'>
                          {dataV2?.hasteCases?.cases?.openToPushedRatioYtd ?? '0'}%
                        </Text>
                      </Box>
                    </HStack>

                    <HStack>
                      <Text>عدد الملفات التي صدر بها قرار تأجيل</Text>

                      {chartTypes?.hasteCases_cases_totalPushedYtd && (
                        <Text py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'} fontSize={'sm'}>
                          {chartTypes?.hasteCases_cases_totalPushedYtd}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'}>
                <Card.Body p={'2'}>
                  <HStack gap={4} justify={'space-between'} h={'full'}>
                    <VStack align={'stretch'} justify={'space-between'} h={'full'}>
                      <Text fontWeight={'semibold'}>{dataV2?.hasteCases?.cases?.avgHandingDaysYtd ?? 0} يوم</Text>

                      <HStack>
                        <Text>مدة إنجاز الملف</Text>

                        {chartTypes?.hasteCases_cases_avgHandingDaysYtd && (
                          <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                            {chartTypes?.hasteCases_cases_avgHandingDaysYtd}
                          </Text>
                        )}
                      </HStack>
                    </VStack>

                    <TimerIcon />
                  </HStack>
                </Card.Body>
              </Card.Root>
            </HStack>

            {/* <PendingFiles dataV2={dataV2} /> */}

            <HStack>
              <Card.Root
                bgColor={'#23294f'}
                color={'white'}
                borderColor={'#585252ff'}
                size={'sm'}
                w={'full'}
                h={'full'}>
                <Card.Body p={'2'}>
                  <HStack gap={4} justify={'space-between'}>
                    <VStack align={'stretch'}>
                      <Text fontWeight={'semibold'} color={'#b8b928'}>
                        {formatNumber(dataV2?.csDecisions?.rush?.totalAdjustedCanceledDecisionsYtd ?? 0)}
                      </Text>

                      <HStack>
                        <Text>عدد القرارت المعدلة أو الملغية</Text>

                        {chartTypes?.csDecisions_rush_totalAdjustedCanceledDecisionsYtd && (
                          <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                            {chartTypes?.csDecisions_rush_totalAdjustedCanceledDecisionsYtd}
                          </Text>
                        )}
                      </HStack>
                    </VStack>

                    <Text fontWeight={'semibold'}> {dataV2?.csDecisions?.rush?.decisionsToAdjustRatio ?? 0}%</Text>
                  </HStack>
                </Card.Body>
              </Card.Root>

              <Card.Root
                bgColor={'#23294f'}
                color={'white'}
                borderColor={'#585252ff'}
                size={'sm'}
                w={'full'}
                h={'full'}>
                <Card.Body p={'2'}>
                  <HStack gap={4} justify={'space-between'}>
                    <VStack align={'stretch'}>
                      <Text fontWeight={'semibold'} color={'#b8b928'}>
                        {formatNumber(dataV2?.csDecisions?.grievances?.totalAdjustedCanceledDecisionsYtd ?? 0)}
                      </Text>

                      <HStack>
                        <Text>الاحكام في ملفات التظلمات المعدلة او الملغية ونسبتها</Text>

                        {chartTypes?.csDecisions_grievances_totalAdjustedCanceledDecisionsYtd && (
                          <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                            {chartTypes?.csDecisions_grievances_totalAdjustedCanceledDecisionsYtd}
                          </Text>
                        )}
                      </HStack>
                    </VStack>

                    <Text fontWeight={'semibold'}>{dataV2?.csDecisions?.grievances?.decisionsToAdjustRatio ?? 0}%</Text>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </HStack>

            {/* <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} w={'full'} h={'full'}>
            <Card.Body p={'2'}>
              <VStack align={'stretch'}>
                <Text fontWeight={'semibold'} color={'#b8b928'} fontSize={'xl'}>
                  {dataV2?.csCases?.delayedRegistrations ?? 0} %
                </Text>

                <HStack>
                  <Text fontSize='sm'>نسبة الطلبات التي تجاوزت مستهدف القيد</Text>

                  {chartTypes?.csCases_delayedRegistrations && (
                    <Text fontSize='sm' py={1} px={2} borderRadius={14} bg={'rgba(255, 255, 255, 0.1)'}>
                      {chartTypes?.csCases_delayedRegistrations}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root> */}
          </VStack>
        </Card.Body>
      </Card.Root>

      <CaseDetailsDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
