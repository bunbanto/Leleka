'use client';
import React from 'react';

import { useEffect, useState } from 'react';

import css from './Page.module.css';
import { useAuthStore } from '@/lib/store/authStore';

function GreetingBlock() {
  const [time, setTime] = useState<{ hours: number | null }>({ hours: null });

  // STATE

  const { user } = useAuthStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkTime = (hour: number | null) => {
    if (hour === null) return null;
    if (hour >= 6 && hour < 12) return 'Доброго ранку';
    if (hour >= 12 && hour < 18) return 'Доброго дня';
    if (hour >= 18 && hour < 24) return 'Доброго вечора';
    if (hour >= 0 && hour < 6) return 'Доброї ночі';
    return null;
  };

  const values = time.hours !== null ? checkTime(time.hours) : null;

  return values === null ? (
    <h1 className={css.title}>Loading...</h1>
  ) : (
    <h1 className={css.title}>
      {values}, {user ? user?.name : 'Користувач'}
    </h1>
  );
}

export default GreetingBlock;
