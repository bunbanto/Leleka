'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { useIsMobile } from '@/hooks/useIsMobile';
import { usePathname } from 'next/navigation';

import { useJourneyStore } from '@/lib/store/weeksDataStore';
import { getCurrentWeek, getCurrentWeekPublic } from '@/lib/api/clientApi';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuthStore();
  const path = usePathname();
  const isMobile = useIsMobile();

  // STATE

  const { user } = useAuthStore();

  const pathProfileSetting = () => {
    if (path.includes('/profile')) return null;

    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          isAuthenticated && user?.dueDate
            ? await getCurrentWeek(user.dueDate)
            : await getCurrentWeekPublic();

        if (!data) return;

        useJourneyStore.setState({
          currentWeek: data.week ?? null,
          daysToDue: data.daysToDue ?? null,
          baby: data.pack.baby ?? null,
          mom: data.pack.mom ?? null,
          isLoaded: true,
        });
      } catch (error) {
        console.error('Failed to fetch journey data:', error);
        useJourneyStore.setState({ isLoaded: false });
      }
    };

    fetchData();
  }, [user?.dueDate, isAuthenticated]);

  return (
    <>
      {isMobile === true ? <Header /> : <Sidebar />}
      <main className="main">
        <Breadcrumbs />
        {pathProfileSetting() && <GreetingBlock />}
        {children}
      </main>
    </>
  );
}
