import { Spinner, VStack } from '@chakra-ui/react';
import { LogoIcon } from 'icons/logo-icon';

const FullPageSpinner = () => {
  return (
    <VStack justify={'center'} bgColor={'#141b43'} zIndex={9999} maxW={'8xl'} gap={'8'} minH={'100vh'} minW={'100vw'}>
      <LogoIcon />

      <Spinner size={'lg'} color='white' />
    </VStack>
  );
};
export default FullPageSpinner;
