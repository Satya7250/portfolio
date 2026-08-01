import type { ReactNode } from 'react';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 md:px-6">{children}</main>

      <Footer />
    </div>
  );
}
