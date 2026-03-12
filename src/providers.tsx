import { ChakraProvider, createSystem, defaultConfig, defineConfig, mergeConfigs } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

interface ProvidersProps {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const config = defineConfig({
  theme: {
    breakpoints: {
      base: '0px',
      sm: '480px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      ultra: '2000px',
    },
  },
});

const finalConfig = mergeConfigs(defaultConfig, config);
const mySystem = createSystem(finalConfig);

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={mySystem}>{children}</ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
