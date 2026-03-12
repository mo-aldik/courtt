import { Card, Text, VStack } from '@chakra-ui/react';
import { SessionsSummary } from './sessions-summary';

export const LegalCasesSummary = ({ dataV2 }: any) => {
  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'} h={'full'} flex={1}>
      <Card.Body p={'2'}>
        <VStack align={'stretch'} h={'full'}>
          <Text fontWeight={'semibold'}>الدعاوى المستعجلة و المنازعات الموضوعية و الإشكالات و التظلمات</Text>

          <SessionsSummary dataV2={dataV2} />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
