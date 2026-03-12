import { Card, HStack, Text } from '@chakra-ui/react';
import { LogoIcon } from 'icons/logo-icon';
import { useEffect, useState } from 'react';
import { CalendarNavIcon } from '../icons/calendar-nav-icon';

const daysInArabic = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export const DateInfo = () => {
  const [currentDateText, setCurrentDateText] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dayName = daysInArabic[now.getDay()];
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const timeString = `${hours}:${minutes} ${ampm}`;

      setCurrentDateText(`${dayName} ${day}/${month}/${year} - ${timeString}`);
    };

    updateTime();
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;

    const timeoutId = setTimeout(() => {
      updateTime();

      const intervalId = setInterval(updateTime, 60 * 1000);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Card.Root bgColor={'#23294f'} color={'white'} borderColor={'#585252ff'} size={'sm'}>
      <Card.Body p={'2'}>
        <HStack justify={'space-between'} gap={'8'}>
          <HStack>
            <CalendarNavIcon />

            <Text>{currentDateText}</Text>
          </HStack>

          <LogoIcon w={'40px'} h={'40px'} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
