'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import react, { useState } from 'react';

export function QueryProvider({ children }: { children: react.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
