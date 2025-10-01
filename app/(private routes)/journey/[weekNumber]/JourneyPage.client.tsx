'use client';

// STACK

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// UTILS

import { useJourneyStore } from '@/lib/store/weeksDataStore';
import { Tab } from '@/types/journey';
import { getJourneyByWeekNumberAndTab } from '@/lib/api/clientApi';

// COMPONENTS

import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

import css from './JourneyPageClient.module.css';

const JourneyPageClient = () => {
  // STORE

  const currentWeek = useJourneyStore(s => s.currentWeek);
  const isLoaded = useJourneyStore(s => s.isLoaded);

  const [selectedWeek, setSelectedWeek] = useState<number | null>(currentWeek);
  const [activeTab, setActiveTab] = useState<Tab>('baby');

  const weekToQuery = selectedWeek ?? currentWeek;

  const isWeekDefined = typeof weekToQuery === 'number';

  const { data, isLoading } = useQuery({
    queryKey: ['journey', weekToQuery, activeTab],
    queryFn: () => getJourneyByWeekNumberAndTab(weekToQuery!, activeTab),
    enabled: isLoaded && isWeekDefined,
    refetchOnMount: false,
  });

  return (
    <>
      <div className={css.weekContainer}>
        <WeekSelector
          selectedWeek={selectedWeek}
          currentWeek={currentWeek}
          onSelectedWeek={setSelectedWeek}
        />
      </div>

      <JourneyDetails
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};

export default JourneyPageClient;
